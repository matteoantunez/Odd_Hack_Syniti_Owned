new ReverseTemplateList([new ReverseTemplate("enterprise.com-cancellation-old-de",function(e){return/Storniert: Enterprise Rent-A-Car Reservierung/.test(e.subject)},function(e){if(/Storniert: Enterprise Rent-A-Car Reservierung/.test(e.subject)){var r="de_DE",t={namePrefix:"Sehr geehrte(r)",pickUpDatePrefix:"Schade, dass Sie den f\xfcr den",reservationIdPrefix:"Best\xe4tigungsnummer:"};return loadHelper("enterprise.com-cancellation-old-skeleton.js")(e,r,t)}},"SGbb96386d"),new ReverseTemplate("enterprise.com-cancellation-old-en",function(e){return/Cancelled: Enterprise Rent-A-Car Reservation/.test(e.subject)},function(e){if(/Cancelled: Enterprise Rent-A-Car Reservation/.test(e.subject)){var r="en_US",t={namePrefix:"Dear",pickUpDatePrefix:"picking up your rental car with us",reservationIdPrefix:"confirmation number:"};return loadHelper("enterprise.com-cancellation-old-skeleton.js")(e,r,t)}},"SG5974cd3a"),new ReverseTemplate("enterprise.com-cancellation-old-es",function(e){return/Cancelado: Reservaci\xf3n de Enteprise Rent-A-Car/.test(e.subject)},function(e){if(/Cancelado: Reservaci\xf3n de Enteprise Rent-A-Car/.test(e.subject)){var r="es_ES",t={namePrefix:"Estimado/a",pickUpDatePrefix:"recoger su auto de renta con nosotros",reservationIdPrefix:"n\xfamero de confirmaci\xf3n:"};return loadHelper("enterprise.com-cancellation-old-skeleton.js")(e,r,t)}},"SG213aadd1"),new ReverseTemplate("enterprise.com-cancellation-old-fr",function(e){return/Annulation de votre r\xe9servation Enterprise Rent-A-Car/.test(e.subject)},function(e){if(/Annulation de votre r\xe9servation Enterprise Rent-A-Car/.test(e.subject)){var r="fr_FR",t={namePrefix:"Cher/Ch\xe8re",pickUpDatePrefix:"avez annul\xe9 la r\xe9servation d'une voiture de location pour",reservationIdPrefix:"num\xe9ro de confirmation :"};return loadHelper("enterprise.com-cancellation-old-skeleton.js")(e,r,t)}},"SGb36d6249"),new ReverseTemplate("enterprise.com-confirmation-old-de",function(e){return/^(?:Aktualisiert|Best\xe4tigt): Enterprise Rent-A-Car Reservierung$/.test(e.subject)},function(e){if(/^(?:Aktualisiert|Best\xe4tigt): Enterprise Rent-A-Car Reservierung$/.test(e.subject)){var r="de_DE",t={namePrefix:"Name:",reservationIdPrefix:"Best\xe4tigungsnummer:",modifyReservationUrlPrefix:"\xc4ndern oder Stornieren dieser Reservierung",pickUpDatePrefix:"Mietbeginn:",dropOffDatePrefix:"Mietende:",pickUpHeader:"Adresse und Telefonnummer der Vermietstation:",pickUpPhonePrefix:"Tel.:",carAndRatePrefix:"Fahrzeug- und Tarifinformationen:",totalChargesPrefix:"Gesamtpreis"};return loadHelper("enterprise.com-confirmation-old-skeleton.js")(e,r,t)}},"SG28bdea13"),new ReverseTemplate("enterprise.com-confirmation-old-fr",function(e){return/(?:Mise jour|Confirmation) de votre r\xe9servation (?:aupr\xe8s d')?Enterprise Rent-A-Car/.test(e.subject)},function(e){if(/(?:Mise jour|Confirmation) de votre r\xe9servation (?:aupr\xe8s d')?Enterprise Rent-A-Car/.test(e.subject)){var r="fr_FR",t={namePrefix:"Nom :",reservationIdPrefix:"Num\xe9ro de confirmation :",modifyReservationUrlPrefix:"POUR MODIFIER OU ANNULER CETTE R\xc9SERVATION",pickUpDatePrefix:"Date de prise en charge :",dropOffDatePrefix:"Date de restitution :",pickUpHeader:"Adresse et num\xe9ro de t\xe9l\xe9phone de la succursale de prise en charge",pickUpPhonePrefix:"Tel.:",carAndRatePrefix:"Informations sur les tarifs et le v\xe9hicule :",totalChargesPrefix:/(?:total|CO\xdbT TOTAL)/};return loadHelper("enterprise.com-confirmation-old-skeleton.js")(e,r,t)}},"SG630a465f")]);