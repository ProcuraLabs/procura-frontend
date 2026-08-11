/**
 * Application footer. Intentionally lightweight for the shell — links and
 * richer content are added alongside the real pages in later steps.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="app-footer__bar container container--wide">
        <p className="app-footer__copy">© {year} Procura</p>
        <p className="app-footer__note">Decentralized procurement on Stellar</p>
      </div>
    </footer>
  )
}
