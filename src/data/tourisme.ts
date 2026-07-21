/**
 * Page Tourisme. La carte est une carte uMap (OpenStreetMap) partagée,
 * intégrée en iframe comme sur le site d’origine.
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

  carteUrl:
    "https://umap.openstreetmap.fr/fr/map/points-dinterets-a-toulouse-proche-de-lhotel-palla_1241892?scaleControl=false&miniMap=false&scrollWheelZoom=false&zoomControl=true&allowEdit=false&moreControl=true&searchControl=null&tilelayersControl=null&embedControl=null&datalayersControl=true&onLoadPanel=none&captionBar=false&captionMenus=true",

  /** Les 27 lieux, par ordre alphabétique comme sur le site. */
  lieux: [
    { nom: "Basilique Saint-Sernin", description: "Église romane emblématique de Toulouse, datant du XIe siècle.", adresse: "Place Saint-Sernin – Toulouse", site: "http://basilique-saint-sernin.fr" },
    { nom: "Canal du Midi", description: "Location de vélo pour une balade le long du canal du midi.", adresse: "Avenue de l’URSS – Toulouse", site: "https://le-petit-cyclo.com/" },
    { nom: "Cathédrale Saint-Étienne", description: "Cathédrale mêlant styles roman et gothique, siège de l’archevêché.", adresse: "Impasse de la Préfecture – Toulouse", site: "https://paroissescathedraletoulouse.fr/home-2/culture-et-tourisme/cathedrale-saint-etienne/" },
    { nom: "Citée de l’Espace", description: "Parc à thème scientifique dédié à l’espace et aux planètes.", adresse: "Av. Jean Gonord – Toulouse", site: "https://www.cite-espace.com/" },
    { nom: "Coulée Verte du Touch", description: "Voie verte urbaine de 9,5 km – idéale pour promeneurs et joggeurs.", adresse: "75 Chem. des Capelles – Toulouse", site: "https://www.af3v.org/les-voies-vertes/voies/869-coulee-verte-du-touch/" },
    { nom: "Couvent des Jacobins", description: "Chef-d’œuvre de l’art gothique méridional avec cloître paisible.", adresse: "Rue Pargaminières – Toulouse", site: "https://jacobins.toulouse.fr/fr/" },
    { nom: "Fondation Bemberg", description: "Magnifique hôtel particulier de la renaissance, abritant un musée.", adresse: "Place d’Assézat – Toulouse", site: "https://www.fondation-bemberg.fr/musee/lhotel-dassezat" },
    { nom: "Halle de la Machine", description: "Exhibition de machines de spectacles géantes.", adresse: "Aérodrome de Montaudran – Toulouse", site: "https://www.halledelamachine.fr/" },
    { nom: "Jardin Japonais", description: "Jardin zen à la japonaise dans le parc Compans-Caffarelli.", adresse: "Jardin Compans Caffarelli – Toulouse", site: "https://metropole.toulouse.fr/annuaire/jardin-japonais-pierre-baudis" },
    { nom: "Jardin des Plantes", description: "Grand parc arboré avec volières et muséum.", adresse: "56 rue Alfred Duméril – Toulouse", site: "https://metropole.toulouse.fr/annuaire/jardin-des-plantes" },
    { nom: "Jardins du Barry", description: "Parc de 8 hectares au milieu d’espaces naturels préservés.", adresse: "1 Rue Ernest Dufer – Toulouse", site: "https://metropole.toulouse.fr/annuaire/jardin-du-barry" },
    { nom: "La Halle aux Grains", description: "Salle de concert symphonique et de spectacles culturels.", adresse: "Place Dominique Martin Dupuy – Toulouse", site: "https://onct.toulouse.fr/la-halle-aux-grains/" },
    { nom: "La Maison de la Violette", description: "Péniche-musée et boutique sur la violette, fleur de Toulouse.", adresse: "Boulevard de Bonrepos – Toulouse", site: "https://www.lamaisondelaviolette.com/fr/" },
    { nom: "L’Envol des Pionniers", description: "Musée retraçant l’histoire de l’aéropostale et de ses héros.", adresse: "Rue Jacqueline Auriol – Toulouse", site: "https://www.lenvol-des-pionniers.com/" },
    { nom: "Les Abattoirs", description: "Musée d’art moderne et contemporain.", adresse: "Allées Charles de Fitte – Toulouse", site: "https://www.lesabattoirs.org/" },
    { nom: "Let’s Visit Airbus", description: "Visite guidée des usines Airbus à Blagnac.", adresse: "All. André Turcat – Blagnac", site: "https://www.manatour.fr/airbus" },
    { nom: "Marché des Carmes", description: "Marché convivial avec stands variés.", adresse: "Place des Carmes – Toulouse", site: "https://marche-des-carmes.fr/" },
    { nom: "Marché Victor Hugo", description: "Grand marché couvert réputé pour ses produits frais.", adresse: "Rue Rivals – Toulouse", site: "https://www.marche-victor-hugo.fr/" },
    { nom: "Musée Aeroscopia", description: "Musée aéronautique avec avions Concorde et Airbus à visiter.", adresse: "Voie Lactée – Blagnac", site: "https://www.aeroscopia.fr/" },
    { nom: "Musée des Augustins", description: "Musée des beaux-arts installé dans un ancien couvent gothique.", adresse: "Rue Antonin Mercié – Toulouse", site: "https://www.augustins.org/fr/" },
    { nom: "Muséum Histoire Naturelle", description: "Muséum interactif sur la biodiversité, fossiles et animaux.", adresse: "Allées Jules Guesde – Toulouse", site: "https://www.toulouse-tourisme.com/activite/le-museum-de-toulouse/" },
    { nom: "Musée Georges Labit", description: "Objets asiatiques et égyptiennes dans une villa mauresque.", adresse: "Rue du Japon – Toulouse", site: "https://museegeorgeslabit.fr/" },
    { nom: "Musée Saint-Raymond", description: "Musée archéologique avec sculptures romaines et art antique.", adresse: "Place Saint-Sernin – Toulouse", site: "https://saintraymond.toulouse.fr/" },
    { nom: "Nailloux Outlet Village", description: "Village de marques à 25 min de Toulouse avec réductions.", adresse: "Nailloux", site: "https://www.naillouxoutlet.com/fr/" },
    { nom: "Parc du Confluent", description: "Réserve naturelle au sud de Toulouse, parfaite pour les balades.", adresse: "Portet-sur-Garonne", site: "https://www.portetgaronne.fr/le-parc-naturel-de-portet-sur-garonne-et-la-reserve-naturelle/" },
    { nom: "Place du Capitole", description: "Place centrale emblématique entourée de cafés et commerces.", adresse: "Place du Capitole – Toulouse", site: "https://www.toulouse-tourisme.com/activite/le-capitole-hotel-de-ville/" },
    { nom: "Place Saint-Pierre", description: "Place animée au bord de la Garonne, connue pour sa vie nocturne.", adresse: "Place Saint-Pierre – Toulouse", site: "https://www.lebonbon.fr/toulouse/loisirs/que-faire-place-saint-pierre/" },
    { nom: "Pont Neuf", description: "Pont historique en brique traversant la Garonne, datant du XVIIe siècle.", adresse: "1 place Laganne – Toulouse", site: "https://metropole.toulouse.fr/annuaire/pont-neuf" },
    { nom: "Quai de la Daurade", description: "Promenade agréable le long de la Garonne avec vue sur la ville.", adresse: "Quai de la Daurade – Toulouse", site: "https://www.toulouse-tournages.fr/decor/la-daurade-quai-place/" },
    { nom: "Théâtre Garonne", description: "Spectacles de danse, théâtre, musique, et artistes du monde.", adresse: "Avenue du Château d’Eau – Toulouse", site: "https://www.theatregaronne.com/" },
    { nom: "Wam Park Toulouse", description: "Parc de loisirs nautiques sur le lac de Sesquières.", adresse: "Lac de Sesquière – Toulouse", site: "https://www.wampark.fr/toulouse-sesquieres/" },
    { nom: "Zénith de Toulouse", description: "Grande salle de concert et spectacles près du Palladia.", adresse: "Avenue de Grande Bretagne – Toulouse", site: "https://zenith-toulousemetropole.com/" },
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
