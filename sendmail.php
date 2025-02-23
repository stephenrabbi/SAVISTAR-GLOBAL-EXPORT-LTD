<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize inputs
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
    
    // Recipient email
    $to = "info@savistarinc.com";
    
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email content
    $email_content = "
    <html>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br>".nl2br($message)."</p>
    </body>
    </html>
    ";
    
    // Send email
    if(mail($to, $subject, $email_content, $headers)) {
        header('Location: contact.html?status=success');
    } else {
        header('Location: contact.html?status=error');
    }
} else {
    header('Location: contact.html');
}
?>