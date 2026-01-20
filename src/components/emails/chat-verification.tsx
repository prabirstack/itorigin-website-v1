import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ChatVerificationEmailProps {
  name: string;
  pin: string;
}

export const ChatVerificationEmail = ({
  name,
  pin,
}: ChatVerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your IT Origin chat verification code: {pin}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={logo}>IT Origin</Heading>
          </Section>

          <Heading style={heading}>
            Verify Your Email
          </Heading>

          <Text style={paragraph}>
            Hi {name},
          </Text>

          <Text style={paragraph}>
            You requested to start a chat with IT Origin AI Assistant.
            Please use the verification code below to confirm your email address:
          </Text>

          <Section style={codeSection}>
            <Text style={codeLabel}>Your Verification Code</Text>
            <Text style={code}>{pin}</Text>
          </Section>

          <Text style={paragraph}>
            This code will expire in <strong>10 minutes</strong>.
          </Text>

          <Text style={paragraph}>
            If you didn&apos;t request this code, please ignore this email.
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              IT Origin - Enterprise Cybersecurity Solutions
            </Text>
            <Text style={footerText}>
              <Link href="https://itorigin.in" style={link}>
                itorigin.in
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ChatVerificationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const logo = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#22c55e",
  margin: "0",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  color: "#1a1a1a",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#4a4a4a",
  marginBottom: "16px",
};

const codeSection = {
  backgroundColor: "#f4f4f5",
  borderRadius: "8px",
  padding: "24px",
  marginTop: "24px",
  marginBottom: "24px",
  textAlign: "center" as const,
};

const codeLabel = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0",
  marginBottom: "8px",
};

const code = {
  fontSize: "36px",
  fontWeight: "bold",
  color: "#22c55e",
  letterSpacing: "8px",
  margin: "0",
  fontFamily: "monospace",
};

const footer = {
  borderTop: "1px solid #e6e6e6",
  marginTop: "32px",
  paddingTop: "24px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  margin: "0",
  marginBottom: "4px",
};

const link = {
  color: "#22c55e",
  textDecoration: "none",
};
