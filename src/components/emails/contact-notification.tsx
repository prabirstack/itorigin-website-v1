import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt: string;
}

export const ContactNotificationEmail = ({
  name,
  email,
  phone,
  company,
  message,
  submittedAt,
}: ContactNotificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={logo}>IT Origin</Heading>
            <Text style={headerText}>New Lead Notification</Text>
          </Section>

          <Heading style={heading}>New Contact Form Submission</Heading>

          <Text style={intro}>
            A new lead has submitted the contact form on your website.
          </Text>

          <Section style={detailsSection}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{email}</Text>

            {phone && (
              <>
                <Text style={label}>Phone</Text>
                <Text style={value}>{phone}</Text>
              </>
            )}

            {company && (
              <>
                <Text style={label}>Company</Text>
                <Text style={value}>{company}</Text>
              </>
            )}

            <Hr style={divider} />

            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Submitted on {submittedAt}
            </Text>
            <Text style={footerText}>
              This is an automated notification from IT Origin website.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactNotificationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0",
  maxWidth: "560px",
  borderRadius: "8px",
  overflow: "hidden",
};

const headerSection = {
  backgroundColor: "#1a1a1a",
  padding: "24px 20px",
  textAlign: "center" as const,
};

const logo = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#22c55e",
  margin: "0 0 8px 0",
};

const headerText = {
  fontSize: "14px",
  color: "#a0a0a0",
  margin: "0",
};

const heading = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1a1a1a",
  margin: "24px 20px 16px",
};

const intro = {
  fontSize: "15px",
  color: "#4a4a4a",
  margin: "0 20px 24px",
};

const detailsSection = {
  padding: "20px",
  backgroundColor: "#f9fafb",
  margin: "0 20px 24px",
  borderRadius: "8px",
};

const label = {
  fontSize: "12px",
  fontWeight: "bold",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  margin: "0 0 4px 0",
  letterSpacing: "0.5px",
};

const value = {
  fontSize: "15px",
  color: "#1a1a1a",
  margin: "0 0 16px 0",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "16px 0",
};

const messageText = {
  fontSize: "15px",
  color: "#1a1a1a",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.6",
};

const footer = {
  borderTop: "1px solid #e6e6e6",
  padding: "20px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  margin: "0",
  marginBottom: "4px",
};
