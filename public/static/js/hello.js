(() => {
  const EMOJI = {
    WRENCH: '🔧',
    CAR: '🚗',
    STAR: '⭐',
    PHONE: '📞'
  };

  const STYLES = {
    HEADER: 'font-size: 24px; color: #dc3545; font-weight: bold;',
    SUBHEADER: 'font-size: 18px; color: #0d6efd; font-weight: bold;',
    BODY: 'font-size: 14px; color: #f0f0f0;',
    LINK: 'color: #0dcaf0; text-decoration: underline;'
  };

  const messages = {
    welcome: `${EMOJI.WRENCH} Witaj w SMotors!`,
    locations: `${EMOJI.CAR} Nasze Lokalizacje:`,
    services: `${EMOJI.STAR} Nasze Usługi:`,
    contact: `${EMOJI.PHONE} Skontaktuj się z nami:`
  };

  const generateMessage = () => `
%c${messages.welcome}

%c${messages.locations}
%cPrądnik Czerwony: %cDobrego Pasterza 191, 31-416 Kraków
%cNowa Huta: %cKornela Makuszyńskiego 17, 31-752 Kraków

%c${messages.services}
%c• Naprawa zawieszenia
• Naprawa elektryki
• Wymiana opon
• Serwis klimatyzacji

%c${messages.contact}
%cPrądnik Czerwony: %c+48 575 181 919
%cNowa Huta: %c+48 570 460 270`;

  const styles = [
    STYLES.HEADER,
    STYLES.SUBHEADER,
    STYLES.BODY, STYLES.LINK,
    STYLES.BODY, STYLES.LINK,
    STYLES.SUBHEADER,
    STYLES.BODY,
    STYLES.SUBHEADER,
    STYLES.BODY, STYLES.LINK,
    STYLES.BODY, STYLES.LINK
  ];

  console.log(generateMessage(), ...styles);
})();
