# AsyncAPI Security Policy

The AsyncAPI Initiative is committed to maintaining the security of our open source projects. We appreciate your efforts to responsibly disclose your findings and will make every effort to acknowledge your contributions. If you discover a vulnerability, follow the steps below to report it responsibly.

---

## Coordinated Vulnerability Disclosure

At AsyncAPI, we follow [coordinated vulnerability disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure). Please do not open a GitHub issue, do not notify us through any public channels, and do not disclose this issue to third parties. We respond promptly to security reports and appreciate your discretion.

---

## How to Report a Vulnerability

Use one of the following methods to report a vulnerability:

### GitHub Security Form

Submit a private report using GitHub's security advisory form: [Report a vulnerability](https://github.com/asyncapi/asyncapi/security/advisories/new)

This form allows you to privately share details with the maintainers. We'll use [GitHub Security Advisories](https://docs.github.com/en/code-security/security-advisories) to fix and publish information about the vulnerability once it is resolved.

### Email

Alternatively, send an email to: **security@asyncapi.com**

**Include the following in your report:**
- A description of the vulnerability and how to reproduce it
- Affected project and version
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes or mitigation

## Response Timeline

We aim to acknowledge all reports within 72 hours and provide an initial assessment within 5 business days.

## Resolution Timeline

The resolution time will depend on the severity and complexity of the vulnerability, and we will provide updates throughout the process.

## Incident Response Plan

Here's how we handle reported vulnerabilities:

1. **Acknowledge & Validation of the Issue**  
Each security report is acknowledged and reproduced by the security and project maintainers within 5 working days.

2. **Triage**  
Maintainers will assess the severity and impact the vulnerability has on AsyncAPI users and assign a rating to the issue, ranking from critical, high, medium, to low.

3. **Coordinate a Fix**  
We will assign the security issue to one of the security maintainers who will be in charge of coordinating the fix with the maintainers. We will also audit our codebases to find similar vulnerabilities elsewhere. The fix will also undergo thorough testing and code review to ensure the security vulnerability is fully resolved.

4. **Disclose**  
Once the fix is ready and tested, we will create a **GitHub Security Advisory** (GHSA) in the affected repository. This advisory will include:

   - **Vulnerability Description**: A clear explanation of the security issue, including how it could be exploited
   - **Affected Versions**: Specific versions of AsyncAPI components impacted by the vulnerability
   - **Severity Rating**: CVSS score and our internal severity classification (Critical/High/Medium/Low)
   - **CVE Assignment**: Request a Common Vulnerabilities and Exposures (CVE) identifier through GitHub's integration with MITRE
   - **Patched Versions**: The versions that contain the security fix
   - **Credit**: Acknowledgment of the security researcher who reported the issue with their consent

5. **Publish**  
After the GitHub Security Advisory goes live, we will ensure all AsyncAPI users are informed by including the security patch details in the changelog of the affected project, publishing a security article explaining the vulnerability, impact, and required actions to mitigate this for all our users. Finally, we will make a post in the Slack announcements channel. Each notification will include a summary of the vulnerability, clear upgrade instructions, and links to patched versions.

6. **Learnings**  
We will document what went well and what we can do better in future incidents.

## Security Bug Bounty Program

AsyncAPI is an open source initiative maintained by the community. We currently **do not offer monetary bounties** for vulnerability disclosures. However, we deeply appreciate your contribution and may acknowledge your efforts publicly if you wish.

---

📝 **Note:** If you're contributing to AsyncAPI projects, follow secure coding practices and keep dependencies up to date. We regularly audit our codebase and generate SBOMs to ensure compliance and transparency.

---
