import { room } from "@/db/schemas";

export const rooms: Omit<typeof room.$inferInsert, "id" | "authorId">[] = [
  {
    title: "Canapé-lit confortable chez Marie - Salon",
    description:
      "Magnifique salon lumineux avec un canapé-lit de haute qualité exceptionnellement confortable, parfaitement adapté pour un séjour mémorable à Paris. Situé dans un immeuble haussmannien authentique du 1er arrondissement, cet espace bénéficie d'une localisation privilégiée à seulement 5 minutes à pied du Louvre et des principales attractions touristiques. L'appartement dispose d'un accès direct aux transports en commun avec les stations de métro Châtelet-Les Halles et Louvre-Rivoli à proximité immédiate. Le salon est équipé d'une télévision grand écran, d'un WiFi haut débit et d'un coin cuisine fonctionnel avec cafetière, bouilloire et réfrigérateur.",
    price: 25,
    city: "Paris",
    neighborhood: "1st arrondissement",
    rating: 4.8,
  },
  {
    title: "Matelas double chez Pierre - Chambre",
    description:
      "Charmante chambre baignée de lumière naturelle avec un spacieux matelas double de grande qualité, offrant une vue dégagée sur les toits de Marseille. Idéalement située dans le 2ème arrondissement, à seulement 10 minutes à pied du célèbre Vieux-Port et de ses marchés aux poissons authentiques. Cette chambre bénéficie d'un petit-déjeuner continental généreux inclus dans le prix, composé de viennoiseries fraîches, confitures maison, café de qualité et fruits de saison. L'espace dispose également d'un bureau avec vue, parfait pour les nomades numériques, ainsi que d'un accès à une terrasse commune avec barbecue. Pierre, votre hôte passionné par l'histoire marseillaise, se fera un plaisir de vous recommander les meilleures adresses locales.",
    price: 18,
    city: "Marseille",
    neighborhood: "2nd arrondissement",
    rating: 4.2,
  },
  {
    title: "Canapé moderne chez Julie - Studio",
    description:
      "Superbe studio contemporain entièrement rénové avec un élégant canapé convertible haut de gamme, conçu spécialement pour offrir un confort optimal aux voyageurs souhaitant explorer Lyon dans les meilleures conditions. Cet espace design et fonctionnel dispose d'une cuisine entièrement équipée avec tous les électroménagers modernes : four, micro-ondes, lave-vaisselle, réfrigérateur-congélateur, ainsi qu'une large gamme d'ustensiles et de vaisselle. Le studio bénéficie d'une connexion WiFi ultra-rapide, d'un espace de travail ergonomique avec éclairage LED, et d'une salle de bain moderne avec douche à l'italienne. Julie met à disposition des vélos gratuits pour découvrir la ville, des guides touristiques personnalisés et partage volontiers ses adresses secrètes de restaurants et bars lyonnais authentiques.",
    price: 22,
    city: "Lyon",
    neighborhood: "3rd arrondissement",
    rating: 4.6,
  },
  {
    title: "Lit simple chez Antoine - Chambre partagée",
    description:
      "Chambre partagée chaleureuse et accueillante avec un lit simple confortable équipé d'un matelas orthopédique et de draps de qualité hôtelière, dans une ambiance conviviale et respectueuse parfaite pour les rencontres entre voyageurs du monde entier. Cette option économique mais de qualité est spécialement conçue pour les backpackers, étudiants et voyageurs soucieux de leur budget sans compromis sur la propreté et le confort. La chambre dispose d'espaces de rangement sécurisés avec casiers individuels, d'une connexion WiFi gratuite et d'un accès à une cuisine commune entièrement équipée où vous pourrez préparer vos repas et échanger avec d'autres voyageurs. Antoine organise régulièrement des soirées conviviales et peut vous mettre en contact avec d'autres voyageurs pour explorer Marseille ensemble, créant ainsi une véritable communauté temporaire.",
    price: 15,
    city: "Marseille",
    neighborhood: "4th arrondissement",
    rating: 3.9,
  },
  {
    title: "Matelas king-size chez Camille - Chambre privée",
    description:
      "Exceptionnelle chambre privée de luxe dotée d'un somptueux matelas king-size à mémoire de forme avec surmatelas en duvet d'oie, située au cœur du mythique Quartier Latin, l'un des quartiers les plus emblématiques et romantiques de Paris. Cette chambre d'exception offre une vue panoramique à couper le souffle sur la Seine et ses péniches, avec en arrière-plan les illuminations nocturnes de Notre-Dame et de la Sainte-Chapelle. L'espace bénéficie d'une décoration raffinée mêlant mobilier d'époque et équipements modernes, comprenant un dressing spacieux, un bureau en acajou, une machine à café Nespresso et un mini-bar garni. Camille, votre hôtesse experte en histoire parisienne, propose des visites guidées privées et met à disposition une bibliothèque fournie sur Paris, ainsi qu'un service de conciergerie personnalisé pour réserver restaurants et spectacles.",
    price: 35,
    city: "Paris",
    neighborhood: "5th arrondissement",
    rating: 4.9,
  },
  {
    title: "Canapé d'angle chez Nicolas - Salon",
    description:
      "Spacieux salon de 35m² avec un généreux canapé d'angle modulable ultra-confortable pouvant accueillir jusqu'à 4 personnes, idéalement orienté pour profiter de la lumière naturelle toute la journée. L'atout majeur de cet hébergement est sa magnifique terrasse privée de 20m² offrant une vue imprenable sur la Méditerranée, équipée de transats, d'une table de jardin et d'un parasol pour des moments de détente inoubliables face au coucher de soleil. Le salon dispose d'une télévision écran plat, d'une bibliothèque fournie, d'un coin repas et d'un accès direct à une kitchenette équipée. Nicolas, passionné de voile et fin connaisseur des calanques, propose des sorties en bateau sur demande et partage ses spots secrets pour la baignade et la plongée. L'emplacement permet un accès rapide aux plages de sable fin et aux transports vers le centre-ville.",
    price: 20,
    city: "Marseille",
    neighborhood: "6th arrondissement",
    rating: 4.3,
  },
  {
    title: "Lit double chez Sarah - Chambre cozy",
    description:
      "Ravissante chambre cosy au charme parisien avec un confortable lit double 140x200 équipé d'une literie haut de gamme, située dans une rue pittoresque à seulement 8 minutes à pied de la majestueuse Tour Eiffel et du Champ-de-Mars. Cette chambre bénéficie d'une décoration particulièrement soignée mêlant style vintage et touches contemporaines, avec des meubles chinés, des œuvres d'art locales, des plantes vertes et un éclairage d'ambiance créant une atmosphère chaleureuse et romantique. L'espace dispose d'un petit coin lecture avec fauteuil confortable, d'un bureau avec vue sur les toits parisiens, d'une penderie vintage et d'un nécessaire à thé et café. Sarah, graphiste et amoureuse de Paris, a personnalisé chaque détail de la décoration et se fait un plaisir de recommander les meilleures boulangeries du quartier, les marchés locaux et les spots photo Instagram les plus prisés autour de la Tour Eiffel.",
    price: 28,
    city: "Paris",
    neighborhood: "7th arrondissement",
    rating: 4.7,
  },
  {
    title: "Futon japonais chez Yuki - Studio zen",
    description:
      "Exceptionnel studio zen de 28m² inspiré de la philosophie japonaise du minimalisme, équipé d'un authentique futon traditionnel en fibres naturelles importé directement du Japon, accompagné de tatamis originaux et d'un paravent shoji fait main. Cet espace de sérénité absolue, situé dans une résidence calme à 12 minutes des célèbres Champs-Élysées, a été entièrement conçu selon les principes du feng shui pour favoriser la détente et la méditation. Le studio dispose d'un coin thé traditionnel avec service à thé japonais, d'un petit jardin zen intérieur avec fontaine, d'un espace méditation avec coussins zabuton, et d'une bibliothèque spécialisée en culture japonaise. Yuki, maître de thé certifiée et pratiquante de l'ikebana, propose des initiations aux arts traditionnels japonais, des séances de méditation guidée et prépare des petits-déjeuners japonais authentiques sur demande. L'expérience inclut également l'accès à un onsen privé (bain japonais) installé sur la terrasse.",
    price: 30,
    city: "Paris",
    neighborhood: "8th arrondissement",
    rating: 4.4,
  },
  {
    title: "Matelas gonflable chez Marc - Balcon",
    description:
      "Hébergement insolite et économique sur un spacieux balcon couvert de 15m² avec un matelas gonflable premium ultra-confortable équipé d'un surmatelas en mousse à mémoire de forme, offrant une expérience de camping urbain unique au cœur de Lyon. Ce balcon vitré et sécurisé est aménagé comme un véritable cocon extérieur avec éclairage tamisé, rideaux occultants, chauffage d'appoint pour les soirées fraîches, et une vue dégagée sur les toits lyonnais et la basilique Notre-Dame de Fourvière. L'espace dispose d'un petit coffre de rangement étanche, d'une prise électrique, d'un coin lecture avec coussins douillets et d'un accès aux sanitaires intérieurs. Marc, aventurier dans l'âme et guide de randonnée, partage volontiers ses expériences de voyage, organise des soirées étoiles avec télescope et peut vous initier aux bases du camping urbain. Cette expérience atypique inclut un kit de survie urbaine et des recommandations personnalisées pour découvrir Lyon de manière alternative.",
    price: 12,
    city: "Lyon",
    neighborhood: "9th arrondissement",
    rating: 3.8,
  },
  {
    title: "Lit superposé chez Claire - Chambre familiale",
    description:
      "Spacieuse chambre familiale de 25m² spécialement aménagée avec des lits superposés solides et confortables en bois massif, parfaitement adaptée pour accueillir les familles avec enfants ou les groupes d'amis voyageant ensemble à Rennes. Cette chambre lumineuse et colorée dispose de nombreux espaces de rangement individuels, d'un coin jeux avec bibliothèque enfantine, de prises électriques à chaque niveau des lits et d'un éclairage de lecture personnalisé. Située à seulement 15 minutes à pied du centre historique de Rennes et de sa célèbre place du Parlement de Bretagne, l'hébergement offre un accès privilégié aux transports en commun et aux principales attractions touristiques. Claire, maman de trois enfants et ancienne institutrice, a conçu cet espace en pensant aux familles : jeux de société disponibles, guide des activités familiales à Rennes, conseils sur les meilleurs parcs et aires de jeux, et même un service de garde d'enfants sur demande.",
    price: 16,
    city: "Rennes",
    neighborhood: "10th arrondissement",
    rating: 4.1,
  },
  {
    title: "Hamac intérieur chez Paul - Salon original",
    description:
      "Salon extraordinaire et atypique de 30m² avec un authentique hamac brésilien suspendu tissé main, offrant une expérience de sommeil complètement unique et dépaysante en plein cœur de Marseille. Cette pièce à l'ambiance tropicale soigneusement orchestrée transporte instantanément ses hôtes sous les tropiques grâce à sa décoration exotique : plantes luxuriantes, mobilier en bambou, éclairage tamisé couleur ambre, diffuseur d'huiles essentielles et collection de musiques du monde. Le hamac, importé directement de l'État de Ceará au Brésil, est accompagné d'un matelas fin et de coussins moelleux pour un confort optimal. L'espace dispose également d'un coin détente avec poufs marocains, d'un mini-réfrigérateur tropical garni de jus de fruits exotiques, et d'une bibliothèque voyage avec guides et récits d'aventures. Paul, ancien guide touristique ayant parcouru l'Amérique du Sud, partage ses anecdotes de voyage, prépare des cocktails sans alcool aux saveurs tropicales et organise des soirées à thème avec musiques latines.",
    price: 19,
    city: "Marseille",
    neighborhood: "11th arrondissement",
    rating: 4.0,
  },
  {
    title: "Matelas mémoire de forme chez Laura - Chambre premium",
    description:
      "Chambre premium avec matelas à mémoire de forme haut de gamme. Linge de lit de luxe et petit-déjeuner bio.",
    price: 32,
    city: "Paris",
    neighborhood: "12th arrondissement",
    rating: 4.8,
  },
];
