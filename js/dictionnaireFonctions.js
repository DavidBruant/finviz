"use strict";

var dictionnaireFonctions = {
    "0": "Services généraux",
    "01": "Opérations non ventilables",
    "02": "Administration générale",
    /*
        020 Administration générale de la collectivité 
        0201 Personnel non ventilable
        0202 Autres moyens généraux
        021 Assemblée locale
        023 Information, communication, publicité
        04 Coopération décentralisée, action européenne et internationale
        041 Subvention globale
        048 Autres
    */
    
    "1": "Sécurité",
    "10": "Services communs",
    "12": "Incendie et secours",
    /*
    11 Gendarmerie, police, sécurité, justice
    
    18 Autres interventions de protection des personnes et des biens
    */
    
    "2" : "Enseignement",
    "20": "Services communs",
    "21": "Enseignement du premier degré",
    /*
    22 Enseignement du second degré
    221 Collèges
    222 Lycées
    23 Enseignement supérieur
    24 Formation professionnelle et apprentissage (COM)
    28 Autres services périscolaires et annexes
    */
    
    "3": "Culture, vie sociale, jeunesse, sports et loisirs",
    "30": "Services communs",
    "31": "Culture",
    /*
    311 Activités artistiques et action culturelle
    312 Patrimoine 
    (musées, monuments ...)
    313 Bibliothèques, médiathèques
    314 Musées
    315 Services d'archives
    32 Sports
    33 Jeunesse (action socio-éducative...) et loisirs
    */
    
    "4": "Prévention médico-sociale",
    "40": "Services communs",
    "41": "PMI et planification familiale",
    /*
    42 Prévention et éducation pour la santé
    48 Autres actions
    */
    
    "5": "Action sociale (hors RMI, APA, RSA)",
    "50": "Services communs",
    "51": "Famille et enfance",
    /*
    52 Personnes handicapées
    53 Personnes âgées
    58 Autres interventions sociales
    */
    
    "54": "RMI",
    "541": "Insertion sociale",
    "542": "Santé",
    /*
    543 Logement
    544 Insertion professionnelle
    545 Evaluation des dépenses engagées
    546 Dépenses de structure
    547 RMI – RMA
    5471 RMI – Allocations
    5472 RMA
    548 Autres dépenses au titre du RMI
    */
    
    "55": "Personnes dépendantes (APA)",
    "550": "Services communs",
    "551": "APA à domicile",
    /*
    552 APA versée au bénéficiaire en établissement
    553 APA versée à l’établissement
    */
    
    "56": "RSA",
    "561": "Insertion sociale",
    /*
    562 Santé
    563 Logement
    564 Insertion professionnelle
    565 Evaluation des dépenses engagées
    566 Dépenses de structure
    567 RSA allocations
    568 Autres dépenses au titre du RSA
    */
    
    "6": "Réseaux et infrastructures",
    "60": "Services communs",
    "61": "Eau et assainissement",
    /*
    62 Routes et voirie
    621 Réseau routier départemental
    622 Viabilité hivernale et aléas climatiques
    628 Autres réseaux de voirie
    63 Infrastructures ferroviaires et aéroportuaires
    64 Infrastructures fluviales, maritimes et portuaires
    68 Autres réseaux
    */
    
    "7": "Aménagement et environnement",
    "70": "Services communs",
    "71": "Aménagement et développement urbain",
    /*
    72 Logement
    73 Environnement
    731 Actions en matière de traitement des déchets
    738 Autres actions en faveur du milieu naturel
    74 Aménagement et développement rural
    */
    
    "8": "Transports",
    "80": "Services communs",
    "81": "Transports scolaires",
    /*
    82 Transports publics de voyageurs
    821 Routier
    822 Ferroviaire
    823 Maritime
    824 Fluvial
    825 Aérien
    88 Autres
    */
    
    
    "9": "Développement économique",
    "90": "Services communs",
    "91": "Structures d'animation et de développement économique"
    /*
    92 Agriculture et pêche
    921 Laboratoire départemental
    928 Autres
    93 Industrie, commerce et artisanat
    94 Développement touristique
    95 Maintien et développement des services publics non départementaux
    */
    
}