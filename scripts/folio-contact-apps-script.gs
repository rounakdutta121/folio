/**
 * Folio contact form → email (duttarounak746@gmail.com)
 *
 * CRITICAL — deployment settings (403 = wrong settings):
 * 1. Paste into script.google.com → New project
 * 2. Deploy → New deployment → Web app
 * 3. Execute as: Me
 * 4. Who has access: Anyone   ← must be Anyone, not "Anyone with Google account"
 * 5. Click Deploy → Authorize MailApp when prompted
 * 6. Copy the /exec URL into Folio .env as GOOGLE_APPS_SCRIPT_CONTACT_URL
 *
 * If you change the script later: Deploy → Manage deployments → Edit → New version
 */

var TO_EMAIL = "duttarounak746@gmail.com";

function doPost(e) {
  try {
    var data = parseBody_(e);

    var name = String(data.name || "").trim();
    var email = String(data.email || "").trim();
    var topic = String(data.topic || "General").trim();
    var message = String(data.message || "").trim();
    var company = String(data.company || "").trim();

    if (company) {
      return json_({ ok: true });
    }

    if (!name || name.length < 2) {
      return json_({ ok: false, error: "Invalid name" });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: "Invalid email" });
    }
    if (!message) {
      return json_({ ok: false, error: "Message required" });
    }

    MailApp.sendEmail({
      to: TO_EMAIL,
      replyTo: email,
      subject: "[Folio contact] " + topic + " — " + name,
      body:
        "New Folio contact form submission\n\n" +
        "Name: " +
        name +
        "\nEmail: " +
        email +
        "\nTopic: " +
        topic +
        "\n\nMessage:\n" +
        message +
        "\n",
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json_({
    ok: true,
    service: "Folio contact",
    to: TO_EMAIL,
    hint: "POST JSON {name,email,topic,message}",
  });
}

function parseBody_(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    var raw = e.postData.contents;
    try {
      return JSON.parse(raw);
    } catch (err) {
      // application/x-www-form-urlencoded fallback
      return e.parameter || {};
    }
  }
  return e.parameter || {};
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
