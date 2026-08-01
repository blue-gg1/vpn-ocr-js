async function getVpnBookPassword() {
  const res = await fetch("https://www.vpnbook.com/freevpn/openvpn");
  const html = await res.text();

  const doc = new DOMParser().parseFromString(html, "text/html");

  const password = [...doc.querySelectorAll("code")]
    .find(el => el.textContent.trim() !== "vpnbook")
    ?.textContent.trim();

  return password;
}

getVpnBookPassword().then(console.log);