import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewsletterConfirmEmailProps {
  confirmUrl: string;
  name?: string;
}

export const NewsletterConfirmEmail = ({
  confirmUrl,
  name,
}: NewsletterConfirmEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirm your IT Origin newsletter subscription</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={logo}>IT Origin</Heading>
          </Section>

          <Heading style={heading}>
            {name ? `Welcome, ${name}!` : "Welcome!"}
          </Heading>

          <Text style={paragraph}>
            Thank you for subscribing to the IT Origin newsletter. You&apos;re
            one step away from receiving expert cybersecurity insights, industry
            updates, and exclusive resources.
          </Text>

          <Text style={paragraph}>
            Please confirm your email address by clicking the button below:
          </Text>

          <Section style={buttonSection}>
            <Button style={button} href={confirmUrl}>
              Confirm Subscription
            </Button>
          </Section>

          <Text style={paragraph}>
            If you didn&apos;t subscribe to our newsletter, you can safely
            ignore this email.
          </Text>

          <Text style={paragraph}>
            This confirmation link will expire in 24 hours.
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

export default NewsletterConfirmEmail;

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

const buttonSection = {
  textAlign: "center" as const,
  marginTop: "32px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#22c55e",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "14px 28px",
  display: "inline-block",
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
