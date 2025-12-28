import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface NewsletterWelcomeEmailProps {
  name?: string;
  unsubscribeUrl: string;
}

export const NewsletterWelcomeEmail = ({
  name,
  unsubscribeUrl,
}: NewsletterWelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to IT Origin - Your cybersecurity partner</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Heading style={logo}>IT Origin</Heading>
          </Section>

          <Heading style={heading}>
            {name ? `Welcome aboard, ${name}!` : "Welcome aboard!"}
          </Heading>

          <Text style={paragraph}>
            Thank you for confirming your subscription to the IT Origin
            newsletter. You&apos;re now part of a community of security-conscious
            professionals staying ahead of cyber threats.
          </Text>

          <Text style={paragraph}>Here&apos;s what you can expect from us:</Text>

          <Section style={listSection}>
            <Text style={listItem}>
              <strong>Weekly Security Insights</strong> - Expert analysis of the
              latest threats and vulnerabilities
            </Text>
            <Text style={listItem}>
              <strong>Industry News</strong> - Stay informed about cybersecurity
              trends and regulations
            </Text>
            <Text style={listItem}>
              <strong>Best Practices</strong> - Actionable tips to strengthen
              your security posture
            </Text>
            <Text style={listItem}>
              <strong>Exclusive Resources</strong> - Early access to
              whitepapers, guides, and webinars
            </Text>
          </Section>

          <Section style={buttonSection}>
            <Button style={button} href="https://itorigin.in/blogs">
              Read Our Latest Articles
            </Button>
          </Section>

          <Text style={paragraph}>
            Have questions about our services? Our team is here to help.
          </Text>

          <Section style={servicesSection}>
            <Text style={serviceTitle}>Our Services:</Text>
            <Text style={serviceItem}>
              <Link href="https://itorigin.in/services/managed-soc-services" style={link}>
                Managed SOC Services
              </Link>
            </Text>
            <Text style={serviceItem}>
              <Link href="https://itorigin.in/services/penetration-testing" style={link}>
                Penetration Testing
              </Link>
            </Text>
            <Text style={serviceItem}>
              <Link href="https://itorigin.in/services/grc-services" style={link}>
                GRC & Compliance
              </Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              IT Origin - Enterprise Cybersecurity Solutions
            </Text>
            <Text style={footerText}>
              <Link href="https://itorigin.in" style={link}>
                itorigin.in
              </Link>
              {" | "}
              <Link href={unsubscribeUrl} style={link}>
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewsletterWelcomeEmail;

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

const listSection = {
  marginTop: "24px",
  marginBottom: "24px",
  padding: "0 16px",
};

const listItem = {
  fontSize: "15px",
  lineHeight: "24px",
  color: "#4a4a4a",
  marginBottom: "12px",
  paddingLeft: "8px",
  borderLeft: "3px solid #22c55e",
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

const servicesSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  marginTop: "24px",
  marginBottom: "24px",
};

const serviceTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#1a1a1a",
  marginBottom: "12px",
};

const serviceItem = {
  fontSize: "14px",
  color: "#4a4a4a",
  margin: "0",
  marginBottom: "8px",
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
