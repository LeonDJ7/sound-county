// SmtpJS exposes a variable `Email` on the global `window` object

declare namespace Email {
  
    interface EmailData {
      Host: string;
      Username: string;
      Password: string;
      To: string | string[];
      From: string;
      Subject: string;
      Body: string;
    }

    function send(email: EmailData): Promise<string>;
  
}