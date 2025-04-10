import React, { useState } from "react";
import styles from "../styles/footer.module.css";
import Image from "next/image";
import { useAppContext } from "@/contexts/AppContext";

export const FooterComponent = () => {
  const { isMobile } = useAppContext();
  const [isFirstQuickLinksOpened, setIsFirstQuickLinksOpened] = useState(false);
  const [isSecondQuickLinksOpened, setIsSecondQuickLinksOpened] =
    useState(false);

  const links = [
    "About Us",
    "Stories",
    "Artisans",
    "Boutiques",
    "Contact Us",
    "EU Compliances Docs",
  ];

  const quickLinks = [
    "Orders & Shipping",
    "Join/Login as a Seller",
    "Payment & Pricing",
    "Return & Refunds",
    "FAQs",
    "Privacy Policy",
    "Terms & Conditions",
  ];

  const paymentImages = [
    "/images/payment_1.png",
    "/images/payment_2.png",
    "/images/payment_3.png",
    "/images/payment_4.png",
    "/images/payment_5.png",
    "/images/payment_6.png",
  ];

  const toggleFirstQuickLinksExpand = () => {
    setIsFirstQuickLinksOpened(!isFirstQuickLinksOpened);
  };
  const toggleSecondQuickLinksExpand = () => {
    setIsSecondQuickLinksOpened(!isSecondQuickLinksOpened);
  };

  const socialMediaIcons = ["/images/instagram.png", "/images/linkedin.png"];
  return (
    <footer className={styles.footerMain}>
      <div className={styles.footerFirstWrapper}>
        <div className={styles.footerSubscribeForm}>
          <div className={styles.footerSubscribeTitle}>
            Be the first to know
          </div>
          <div className={styles.footerSubscribeSubtitle}>
            Sign up for updates from mettā muse.
          </div>
          <div className={styles.footerSubscribeInputWrapper}>
            <input
              placeholder="Enter your e-mail..."
              className={styles.footerSubscribeInput}
            />
            <div className={styles.footerSubscribeButton}>Subscribe</div>
          </div>
        </div>
        <div className={styles.contactUs}>
          <div className={styles.contactUsTitle}>Contact Us</div>
          <div className={styles.contactUsWrap}>
            <div className={styles.contactUsDetails}>+44 221 133 5360</div>
            <div className={styles.contactUsDetails}>
              customercare@mettamuse.com
            </div>
          </div>

          <div className={styles.contactUsTitle}>Currency</div>
          <div className={styles.contactUsCurrency}>
            <Image
              src="/images/us_logo.png"
              alt="us_logo"
              height={isMobile ? 20 : 24}
              width={isMobile ? 20 : 24}
            />
            <div>+ USD</div>
          </div>

          <div className={styles.contactUsDescription}>
            Transactions will be completed in Euros and a currency reference is
            available on hover.
          </div>
        </div>
      </div>

      <div className={styles.footerSecondWrapper}>
        <div className={styles.footerLinks}>
          <div className={styles.footerLinksWrapper}>
            <div
              className={styles.linksTitleWrapper}
              onClick={isMobile ? toggleFirstQuickLinksExpand : undefined}
              role={isMobile ? "button" : undefined}
              aria-expanded={isMobile ? isFirstQuickLinksOpened : undefined}
              tabIndex={isMobile ? 0 : undefined}
            >
              <div className={styles.linksTitle}>mettā muse</div>
              {isMobile && (
                <div
                  className={`${styles.arrowIcon} ${
                    isFirstQuickLinksOpened ? styles.rotated : ""
                  }`}
                >
                  <Image
                    src="/images/arrow-down-white.png"
                    alt="arrow-down-white"
                    width={12}
                    height={12}
                  />
                </div>
              )}
            </div>

            <div
              className={`${styles.linksContainer} ${
                isMobile && !isFirstQuickLinksOpened ? styles.hidden : ""
              }`}
            >
              {links.map((item, index) => (
                <div key={index} className={styles.linkItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footerLinksWrapper}>
            <div
              className={styles.linksTitleWrapper}
              onClick={isMobile ? toggleSecondQuickLinksExpand : undefined}
              role={isMobile ? "button" : undefined}
              aria-expanded={isMobile ? isSecondQuickLinksOpened : undefined}
              tabIndex={isMobile ? 0 : undefined}
            >
              <div className={styles.linksTitle}>QUICK LINKS</div>
              {isMobile && (
                <div
                  className={`${styles.arrowIcon} ${
                    isSecondQuickLinksOpened ? styles.rotated : ""
                  }`}
                >
                  <Image
                    src="/images/arrow-down-white.png"
                    alt="arrow-down-white"
                    width={12}
                    height={12}
                  />
                </div>
              )}
            </div>

            <div
              className={`${styles.linksContainer} ${
                isMobile && !isSecondQuickLinksOpened ? styles.hidden : ""
              }`}
            >
              {quickLinks.map((item, index) => (
                <div key={index} className={styles.linkItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.followUs}>
          <div
            className={`${styles.socialMediaWrapper} ${styles.socialMediaWrapperBorder}`}
          >
            <div className={styles.socialMediaTitle}>Follow US</div>
            <div className={styles.mediaIcons}>
              {socialMediaIcons.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt="item"
                  height={isMobile ? 24 : 32}
                  width={isMobile ? 24 : 32}
                />
              ))}
            </div>
          </div>

          <div className={styles.socialMediaWrapper}>
            <div className={styles.socialMediaTitle}>mettā muse Accepts</div>
            <div className={styles.mediaIcons}>
              {paymentImages.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt="item"
                  height={isMobile ? 30 : 35}
                  width={isMobile ? 51 : 56}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
