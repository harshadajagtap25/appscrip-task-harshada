import Image from "next/image";
import styles from "../styles/Header.module.css";
import React from "react";
import { useAppContext } from "@/contexts/AppContext";
export default function HeaderComponent() {
  const { isMobile } = useAppContext();

  const webIconUrls = [
    "/images/search-normal.png",
    "/images/heart.png",
    "/images/search-normal.png",
    "/images/shopping-bag.png",
    "/images/profile.png",
  ];
  const mobileIconUrls = [
    "/images/search-normal.png",
    "/images/heart.png",
    "/images/shopping-bag.png",
  ];
  const tabsText = ["Shop", "Skills", "Stories", "About", "Contact Us"];

  return (
    <div>
      <div className={styles.blackStrip}>
        <div className={styles.blackStripImageText}>
          <Image
            src="/images/headerIcon.png"
            alt="headerIcon"
            height={16}
            width={16}
          />
          <div className={styles.blackStripText}>Lorem ipsum dolor</div>
        </div>
        <div className={styles.blackStripImageText}>
          <Image
            src="/images/headerIcon.png"
            alt="headerIcon"
            height={16}
            width={16}
          />
          <div className={styles.blackStripText}>Lorem ipsum dolor</div>
        </div>
        {!isMobile && (
          <div className={styles.blackStripImageText}>
            <Image
              src="/images/headerIcon.png"
              alt="headerIcon"
              height={16}
              width={16}
            />
            <div className={styles.blackStripText}>Lorem ipsum dolor</div>
          </div>
        )}
      </div>

      <div className={styles.header}>
        <div className={styles.headerBrandInfo}>
          <div className={styles.hambergerLogoWrapper}>
            {isMobile && (
              <Image
                src="/images/hamburger.png"
                alt="hamburger"
                height={20}
                width={20}
              />
            )}
            <Image
              src="/images/brandLogo.png"
              alt="brandLogo"
              height={isMobile ? 20.1 : 35.66}
              width={isMobile ? 20.1 : 35.66}
            />
          </div>
          <div className={styles.brandName}>LOGO</div>
          <div className={styles.headerIcons}>
            {!isMobile &&
              webIconUrls.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt={item}
                  height={24}
                  width={24}
                />
              ))}

            {isMobile &&
              mobileIconUrls.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  alt={item}
                  height={20}
                  width={20}
                />
              ))}

            <div className={styles.headerIconsLanguage}>
              <span>ENG</span>
              <Image
                src="/images/arrow-down.png"
                alt="arrow-down"
                height={24}
                width={24}
              />
            </div>
          </div>
        </div>

        <div className={styles.headerTabs}>
          {tabsText.map((item, index) => {
            return (
              <div key={index} className={styles.headerTabsText}>
                {item}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.headerTitleBoxWrapper}>
        <div className={styles.headerTitleBox}>
          <div className={styles.mobileTabsWrapper}>
            <div>Home</div>
            <div className={styles.tabDivider}></div>
            <div>Shop</div>
          </div>
          <h1 className={styles.headerTitleText}>DISCOVER OUR PRODUCTS</h1>
          <div className={styles.headerSubTitle}>
            Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
            scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
            dolor.
          </div>
        </div>
      </div>
    </div>
  );
}
