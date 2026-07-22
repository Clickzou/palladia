/**
 * Page Tourisme. Les positions viennent de la carte uMap de l’hôtel, relevées
 * par scripts/coordonnees-umap.mjs ; la carte, elle, est désormais dessinée
 * par le site (components/CarteTourisme) pour que les fiches soient traduites.
 */
export const tourisme = {
  metaTitle: "Visiter Toulouse : les lieux et visites incontournables - Hôtel Palladia",
  metaDescription:
    "Préparez vos visites à Toulouse : place du Capitole, basilique Saint-Sernin, canal du Midi, musées… tous les lieux incontournables depuis l’Hôtel Palladia.",
  title: "Visites à Toulouse : découvrez les lieux emblématiques de la ville rose",

  intro: [
    "Préparez vos **visites à Toulouse** et plongez au cœur de la ville rose, entre histoire, patrimoine et lieux incontournables. Capitale du sud-ouest de la France, Toulouse séduit les amateurs de balade à pied, les passionnés d’art, d’architecture et de culture. Située entre la Garonne et le canal du Midi, la ville offre une expérience riche et vivante.",
    "En une journée, partez à la découverte du centre historique : la célèbre place du Capitole, la majestueuse basilique Saint-Sernin, le couvent des Jacobins et d’autres édifices du XIIIᵉ siècle qui racontent l’histoire de Toulouse.",
    "Profitez aussi des musées comme le Muséum, les Beaux-Arts ou la Halle de la Machine. Le quartier Saint-Cyprien, avec son jardin Raymond VI, complète cette immersion au cœur du patrimoine toulousain.",
    "Pour une visite originale, optez pour un guide privé ou un pass tourisme incluant transport, activité, entrée dans les sites historiques, et suggestions au départ de votre hôtel.",
  ],


  /** Les 27 lieux, par ordre alphabétique comme sur le site. */
  lieux: [
    { nom: "Basilique Saint-Sernin", lat: 43.608382, lng: 1.44197, description: "Église romane emblématique de Toulouse, datant du XIe siècle.", adresse: "Place Saint-Sernin – Toulouse", site: "http://basilique-saint-sernin.fr" },
    { nom: "Canal du Midi", lat: 43.583019, lng: 1.448605, description: "Location de vélo pour une balade le long du canal du midi.", adresse: "Avenue de l’URSS – Toulouse", site: "https://le-petit-cyclo.com/" },
    { nom: "Cathédrale Saint-Étienne", lat: 43.599887, lng: 1.450659, description: "Cathédrale mêlant styles roman et gothique, siège de l’archevêché.", adresse: "Impasse de la Préfecture – Toulouse", site: "https://paroissescathedraletoulouse.fr/home-2/culture-et-tourisme/cathedrale-saint-etienne/" },
    { nom: "Cité de l’Espace", lat: 43.586022, lng: 1.492778, description: "Parc à thème scientifique dédié à l’espace et aux planètes.", adresse: "Av. Jean Gonord – Toulouse", site: "https://www.cite-espace.com/" },
    { nom: "Coulée Verte du Touch", lat: 43.607968, lng: 1.38756, description: "Voie verte urbaine de 9,5 km – idéale pour promeneurs et joggeurs.", adresse: "75 Chem. des Capelles – Toulouse", site: "https://www.af3v.org/les-voies-vertes/voies/869-coulee-verte-du-touch/" },
    { nom: "Couvent des Jacobins", lat: 43.60449, lng: 1.439906, description: "Chef-d’œuvre de l’art gothique méridional avec cloître paisible.", adresse: "Rue Pargaminières – Toulouse", site: "https://jacobins.toulouse.fr/fr/" },
    { nom: "Fondation Bemberg", lat: 43.600382, lng: 1.441882, description: "Magnifique hôtel particulier de la renaissance, abritant un musée.", adresse: "Place d’Assézat – Toulouse", site: "https://www.fondation-bemberg.fr/musee/lhotel-dassezat" },
    { nom: "Halle de la Machine", lat: 43.572756, lng: 1.478113, description: "Exhibition de machines de spectacles géantes.", adresse: "Aérodrome de Montaudran – Toulouse", site: "https://www.halledelamachine.fr/" },
    { nom: "Jardin Japonais", lat: 43.611915, lng: 1.43216, description: "Jardin zen à la japonaise dans le parc Compans-Caffarelli.", adresse: "Jardin Compans Caffarelli – Toulouse", site: "https://metropole.toulouse.fr/annuaire/jardin-japonais-pierre-baudis" },
    { nom: "Jardin des Plantes", lat: 43.593076, lng: 1.451239, description: "Grand parc arboré avec volières et muséum.", adresse: "56 rue Alfred Duméril – Toulouse", site: "https://metropole.toulouse.fr/annuaire/jardin-des-plantes" },
    { nom: "Jardins du Barry", lat: 43.60004, lng: 1.402149, description: "Parc de 8 hectares au milieu d’espaces naturels préservés.", adresse: "1 Rue Ernest Dufer – Toulouse", site: "https://metropole.toulouse.fr/annuaire/jardin-du-barry" },
    { nom: "La Halle aux Grains", lat: 43.599853, lng: 1.454429, description: "Salle de concert symphonique et de spectacles culturels.", adresse: "Place Dominique Martin Dupuy – Toulouse", site: "https://onct.toulouse.fr/la-halle-aux-grains/" },
    { nom: "La Maison de la Violette", lat: 43.609758, lng: 1.45358, description: "Péniche-musée et boutique sur la violette, fleur de Toulouse.", adresse: "Boulevard de Bonrepos – Toulouse", site: "https://www.lamaisondelaviolette.com/fr/" },
    { nom: "L’Envol des Pionniers", lat: 43.574271, lng: 1.476944, description: "Musée retraçant l’histoire de l’aéropostale et de ses héros.", adresse: "Rue Jacqueline Auriol – Toulouse", site: "https://www.lenvol-des-pionniers.com/" },
    { nom: "Les Abattoirs", lat: 43.600918, lng: 1.429599, description: "Musée d’art moderne et contemporain.", adresse: "Allées Charles de Fitte – Toulouse", site: "https://www.lesabattoirs.org/" },
    { nom: "Let’s Visit Airbus", lat: 43.659307, lng: 1.358485, description: "Visite guidée des usines Airbus à Blagnac.", adresse: "All. André Turcat – Blagnac", site: "https://www.manatour.fr/airbus" },
    { nom: "Marché des Carmes", lat: 43.597776, lng: 1.444473, description: "Marché convivial avec stands variés.", adresse: "Place des Carmes – Toulouse", site: "https://marche-des-carmes.fr/" },
    { nom: "Marché Victor Hugo", lat: 43.60651, lng: 1.44665, description: "Grand marché couvert réputé pour ses produits frais.", adresse: "Rue Rivals – Toulouse", site: "https://www.marche-victor-hugo.fr/" },
    { nom: "Musée Aeroscopia", lat: 43.659874, lng: 1.359783, description: "Musée aéronautique avec avions Concorde et Airbus à visiter.", adresse: "Voie Lactée – Blagnac", site: "https://www.aeroscopia.fr/" },
    { nom: "Musée des Augustins", lat: 43.600942, lng: 1.446343, description: "Musée des beaux-arts installé dans un ancien couvent gothique.", adresse: "Rue Antonin Mercié – Toulouse", site: "https://www.augustins.org/fr/" },
    { nom: "Muséum Histoire Naturelle", lat: 43.593363, lng: 1.449529, description: "Muséum interactif sur la biodiversité, fossiles et animaux.", adresse: "Allées Jules Guesde – Toulouse", site: "https://www.toulouse-tourisme.com/activite/le-museum-de-toulouse/" },
    { nom: "Musée Georges Labit", lat: 43.591119, lng: 1.458464, description: "Objets asiatiques et égyptiennes dans une villa mauresque.", adresse: "Rue du Japon – Toulouse", site: "https://museegeorgeslabit.fr/" },
    { nom: "Musée Saint-Raymond", lat: 43.607831, lng: 1.44112, description: "Musée archéologique avec sculptures romaines et art antique.", adresse: "Place Saint-Sernin – Toulouse", site: "https://saintraymond.toulouse.fr/" },
    { nom: "Nailloux Outlet Village", lat: 43.385495, lng: 1.61144, description: "Village de marques à 25 min de Toulouse avec réductions.", adresse: "Nailloux", site: "https://www.naillouxoutlet.com/fr/" },
    { nom: "Parc du Confluent", lat: 43.521529, lng: 1.419154, description: "Réserve naturelle au sud de Toulouse, parfaite pour les balades.", adresse: "Portet-sur-Garonne", site: "https://www.portetgaronne.fr/le-parc-naturel-de-portet-sur-garonne-et-la-reserve-naturelle/" },
    { nom: "Place du Capitole", lat: 43.604399, lng: 1.443352, description: "Place centrale emblématique entourée de cafés et commerces.", adresse: "Place du Capitole – Toulouse", site: "https://www.toulouse-tourisme.com/activite/le-capitole-hotel-de-ville/" },
    { nom: "Place Saint-Pierre", lat: 43.60349, lng: 1.435887, description: "Place animée au bord de la Garonne, connue pour sa vie nocturne.", adresse: "Place Saint-Pierre – Toulouse", site: "https://www.lebonbon.fr/toulouse/loisirs/que-faire-place-saint-pierre/" },
    { nom: "Pont Neuf", lat: 43.599134, lng: 1.437964, description: "Pont historique en brique traversant la Garonne, datant du XVIIe siècle.", adresse: "1 place Laganne – Toulouse", site: "https://metropole.toulouse.fr/annuaire/pont-neuf" },
    { nom: "Quai de la Daurade", lat: 43.601166, lng: 1.438914, description: "Promenade agréable le long de la Garonne avec vue sur la ville.", adresse: "Quai de la Daurade – Toulouse", site: "https://www.toulouse-tournages.fr/decor/la-daurade-quai-place/" },
    { nom: "Théâtre Garonne", lat: 43.602843, lng: 1.425296, description: "Spectacles de danse, théâtre, musique, et artistes du monde.", adresse: "Avenue du Château d’Eau – Toulouse", site: "https://www.theatregaronne.com/" },
    { nom: "Wam Park Toulouse", lat: 43.651385, lng: 1.419674, description: "Parc de loisirs nautiques sur le lac de Sesquières.", adresse: "Lac de Sesquière – Toulouse", site: "https://www.wampark.fr/toulouse-sesquieres/" },
    { nom: "Zénith de Toulouse", lat: 43.598342, lng: 1.409265, description: "Grande salle de concert et spectacles près du Palladia.", adresse: "Avenue de Grande Bretagne – Toulouse", site: "https://zenith-toulousemetropole.com/" },
  ],

  faq: [
    {
      question: "Que voir à Toulouse en une journée ?",
      reponse:
        "Si vous cherchez que voir à Toulouse en une journée, commencez par visiter Toulouse à pied dans son centre-ville historique. La place du Capitole, emblème de la ville rose, est un passage obligé. Poursuivez avec la basilique Saint-Sernin, classée au patrimoine mondial de l’UNESCO, et le quartier Saint-Cyprien ou Saint-Étienne selon vos envies. Pour enrichir l’expérience, optez pour une visite guidée ou une visite privée proposée par l’office de tourisme.",
    },
    {
      question: "Quelles sont les visites incontournables à Toulouse ?",
      reponse:
        "Parmi les visites incontournables, retrouvez la majestueuse basilique Saint-Sernin, le magnifique couvent des Jacobins, la place du Capitole animée, ainsi que le Muséum de Toulouse pour petits et grands. Le canal du Midi, classé au patrimoine mondial, vous invite à une promenade paisible. Ces lieux reflètent l’âme du patrimoine toulousain, au cœur de la ville rose et de son histoire.",
    },
    {
      question: "Comment organiser une visite à Toulouse ?",
      reponse:
        "Pour visiter Toulouse efficacement, il est recommandé de réserver une visite guidée via l’office de tourisme. Le prix varie en fonction de la taille du groupe et du type de prestation (ex. : visite privée). Pour choisir la meilleure chose à faire, consultez les itinéraires disponibles ou élaborez votre propre programme pour explorer les monuments et quartiers emblématiques.",
    },
    {
      question: "Quels sont les meilleurs lieux à visiter à Toulouse ?",
      reponse:
        "Les meilleurs lieux pour visiter Toulouse incluent : la basilique Saint-Sernin, la place du Capitole, le canal du Midi, le Musée des Augustins, l’Hôtel de Ville et le quartier Saint-Étienne. Tous ces sites sont incontournables pour apprécier l’architecture, l’histoire et le charme de la ville rose.",
    },
    {
      question: "Quelles activités faire à Toulouse ?",
      reponse:
        "Parmi les activités les plus prisées, on retrouve des visites guidées du centre-ville, des moments de découverte dans les musées, une balade le long du canal du Midi et une flânerie dans les jardins du Grand-Rond ou des Plantes. Pour un séjour touristique réussi, pensez à explorer les marchés, notamment celui de Victor Hugo.",
    },
    {
      question: "Quels monuments visiter à Toulouse ?",
      reponse:
        "La basilique Saint-Sernin, la place du Capitole, le couvent des Jacobins et l’hôtel de ville. Ces lieux reflètent le patrimoine mondial, l’histoire et l’âme du quartier Saint-Étienne, cœur historique de la ville.",
    },
    {
      question: "Où se trouve le meilleur restaurant à Toulouse ?",
      reponse:
        "Vous recherchez le meilleur restaurant à Toulouse ? Rendez-vous dans le quartier Saint-Georges ou près de l’hôtel de ville pour déguster la cuisine locale. Le marché Victor Hugo est une référence en matière de gastronomie : vous y trouverez des produits frais, des chefs réputés, et une ambiance unique pour une dégustation typique de la ville rose.",
    },
  ],
} as const;
