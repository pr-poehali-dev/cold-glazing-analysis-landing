import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Принимает заявку с лендинга и отправляет письмо на почту менеджера."""

    cors = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors, 'body': ''}

    raw_body = event.get('body') or '{}'
    if isinstance(raw_body, dict):
        body = raw_body
    else:
        try:
            body = json.loads(raw_body)
        except Exception:
            return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'bad json'})}

    name    = body.get('name', '').strip()
    phone   = body.get('phone', '').strip()
    address = body.get('address', '').strip()
    source  = body.get('source', 'сайт').strip()
    series  = body.get('series', '').strip()

    if not phone:
        return {'statusCode': 422, 'headers': cors, 'body': json.dumps({'error': 'phone required'})}

    smtp_user = 'login-audit@yandex.ru'
    smtp_pass = os.environ.get('SMTP_PASSWORD', '')
    to_email  = 'login-audit@yandex.ru'

    now = datetime.now().strftime('%d.%m.%Y %H:%M')

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #00669B; color: white; padding: 20px 28px; border-radius: 12px 12px 0 0;">
        <h2 style="margin: 0; font-size: 22px;">🔥 Новая заявка — ТеплоОкна СПб</h2>
        <p style="margin: 6px 0 0; opacity: 0.85; font-size: 14px;">{now}</p>
      </div>
      <div style="background: #f9fafb; padding: 24px 28px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 130px;">Источник</td>
            <td style="padding: 10px 0; font-weight: 600; color: #FC8A15;">{source}</td>
          </tr>
          <tr style="border-top: 1px solid #e5e7eb;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Имя</td>
            <td style="padding: 10px 0; font-weight: 600;">{name or '—'}</td>
          </tr>
          <tr style="border-top: 1px solid #e5e7eb;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Телефон</td>
            <td style="padding: 10px 0; font-weight: 700; font-size: 18px; color: #00669B;">
              <a href="tel:{phone}" style="color: #00669B; text-decoration: none;">{phone}</a>
            </td>
          </tr>
          {'<tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Адрес</td><td style="padding: 10px 0; font-weight: 600;">' + address + '</td></tr>' if address else ''}
          {'<tr style="border-top: 1px solid #e5e7eb;"><td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Серия</td><td style="padding: 10px 0; font-weight: 600; color: #FC8A15;">' + series + '</td></tr>' if series else ''}
        </table>
        <div style="margin-top: 20px; padding: 14px 18px; background: #FFF3E0; border-radius: 8px; border-left: 4px solid #FC8A15;">
          <p style="margin: 0; font-size: 14px; color: #333;">
            ⚡ Перезвоните клиенту в течение <strong>15 минут</strong> — конверсия выше в 3 раза
          </p>
        </div>
      </div>
    </div>
    """

    subject_map = {
        'консультация': 'Заявка на консультацию',
        'замер': 'Заявка на бесплатный замер',
        'серия': f'Заявка на серию «{series}»' if series else 'Заявка с лендинга',
    }
    subject_key = 'замер' if 'замер' in source.lower() else ('консультация' if 'консультация' in source.lower() else 'серия')
    subject = f'[ТеплоОкна СПб] {subject_map[subject_key]} от {name or phone}'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From']    = smtp_user
    msg['To']      = to_email
    msg.attach(MIMEText(html, 'html', 'utf-8'))

    try:
        with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as srv:
            srv.login(smtp_user, smtp_pass)
            srv.sendmail(smtp_user, [to_email], msg.as_string())
    except Exception as e:
        return {'statusCode': 500, 'headers': cors, 'body': json.dumps({'error': str(e)})}

    return {
        'statusCode': 200,
        'headers': cors,
        'body': json.dumps({'ok': True, 'message': 'Заявка отправлена'}),
    }