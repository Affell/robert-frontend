import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Legal.css";

export default function Legal() {
  return (
    <>
      <Header />
      <div className="legal-container">
        <div className="container">
          <div className="legal-content">
            <h1>Mentions Légales</h1>

            <section>
              <h2>1. Informations légales</h2>
              <p>
                <strong>Nom du site :</strong> Robert - Assistant IA
              </p>
              <p>
                <strong>Adresse du site :</strong> [Votre nom de domaine]
              </p>
              <p>
                <strong>Propriétaire :</strong> [Votre nom/société]
              </p>
              <p>
                <strong>Statut :</strong> [Forme juridique]
              </p>
              <p>
                <strong>Capital social :</strong> [Montant si applicable]
              </p>
              <p>
                <strong>Siège social :</strong> [Adresse complète]
              </p>
              <p>
                <strong>Numéro de téléphone :</strong> [Numéro]
              </p>
              <p>
                <strong>Adresse email :</strong> contact@robert-ai.com
              </p>
              <p>
                <strong>Numéro SIRET :</strong> [Numéro si applicable]
              </p>
              <p>
                <strong>Numéro TVA intracommunautaire :</strong> [Numéro si
                applicable]
              </p>
            </section>

            <section>
              <h2>2. Directeur de la publication</h2>
              <p>
                <strong>Nom :</strong> [Nom du responsable]
              </p>
              <p>
                <strong>Qualité :</strong> [Fonction]
              </p>
              <p>
                <strong>Email :</strong> contact@robert-ai.com
              </p>
            </section>

            <section>
              <h2>3. Hébergement</h2>
              <p>
                <strong>Hébergeur :</strong> [Nom de l'hébergeur]
              </p>
              <p>
                <strong>Adresse :</strong> [Adresse de l'hébergeur]
              </p>
              <p>
                <strong>Téléphone :</strong> [Numéro de l'hébergeur]
              </p>
            </section>

            <section>
              <h2>4. Objet du site</h2>
              <p>
                Le site Robert propose un service d'assistant virtuel basé sur
                l'intelligence artificielle. Il permet aux utilisateurs
                d'interagir avec un chatbot intelligent pour obtenir des
                réponses à leurs questions et de l'aide dans diverses tâches.
              </p>
            </section>

            <section>
              <h2>5. Conditions d'utilisation</h2>
              <p>
                L'utilisation du site implique l'acceptation pleine et entière
                des conditions générales d'utilisation décrites ci-après. Ces
                conditions d'utilisation sont susceptibles d'être modifiées ou
                complétées à tout moment.
              </p>
            </section>

            <section>
              <h2>6. Protection des données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données
                (RGPD) et à la loi "Informatique et Libertés", vous disposez
                d'un droit d'accès, de rectification, de suppression et
                d'opposition au traitement de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, vous pouvez nous contacter à l'adresse
                :
                <a href="mailto:privacy@robert-ai.com">privacy@robert-ai.com</a>
              </p>
              <p>
                Les données collectées sont utilisées uniquement pour le
                fonctionnement du service et ne sont pas transmises à des tiers
                sans votre consentement explicite.
              </p>
            </section>

            <section>
              <h2>7. Cookies</h2>
              <p>
                Le site utilise des cookies pour améliorer l'expérience
                utilisateur et analyser le trafic. Vous pouvez configurer votre
                navigateur pour refuser les cookies, mais certaines
                fonctionnalités du site pourraient être limitées.
              </p>
            </section>

            <section>
              <h2>8. Propriété intellectuelle</h2>
              <p>
                Tout le contenu présent sur ce site (textes, images, graphismes,
                logo, icônes, sons, logiciels) est la propriété exclusive de
                [Votre société] ou de ses partenaires. Toute reproduction,
                représentation, modification, publication, adaptation de tout ou
                partie des éléments du site est interdite, sauf autorisation
                écrite préalable.
              </p>
            </section>

            <section>
              <h2>9. Responsabilité</h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que
                possible et le site est périodiquement remis à jour, mais peut
                toutefois contenir des inexactitudes, des omissions ou des
                lacunes. Si vous constatiez une lacune, erreur ou ce qui paraît
                être un dysfonctionnement, merci de bien vouloir le signaler par
                email.
              </p>
              <p>
                L'utilisation de l'assistant IA Robert se fait sous votre seule
                responsabilité. Les réponses fournies par l'IA sont générées
                automatiquement et ne constituent pas des conseils
                professionnels.
              </p>
            </section>

            <section>
              <h2>10. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont régies par le droit
                français. En cas de litige, les tribunaux français seront seuls
                compétents.
              </p>
            </section>

            <section>
              <h2>11. Contact</h2>
              <p>
                Pour toute question concernant ces mentions légales, vous pouvez
                nous contacter :
              </p>
              <ul>
                <li>
                  Par email :{" "}
                  <a href="mailto:contact@robert-ai.com">
                    contact@robert-ai.com
                  </a>
                </li>
                <li>Par téléphone : [Votre numéro]</li>
                <li>Par courrier : [Votre adresse]</li>
              </ul>
            </section>

            <div className="legal-footer">
              <p>
                <em>
                  Dernière mise à jour :{" "}
                  {new Date().toLocaleDateString("fr-FR")}
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
