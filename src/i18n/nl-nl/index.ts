export default {
	general: {
		search: "Zoeken in Mett"
	},
	buttons: {
		close: "Sluiten",
		cancel: "Annuleren",
		save: "Opslaan",
		edit: "Wijzigen",
		delete: "Verwijderen",
		publish: "Publiceren",
		login: "Inloggen",
		comment: "Reageren",
		loadMore: "Meer laden",
		useImage: "Afbeelding gebruiken",
		replaceImage: "Afbeelding vervangen",
		toList: "Naar het overzicht",
		reportBug: "Probleem melden",
		signOut: "Uitloggen"
	},
	state: {
		unpublished: "Niet gepubliceerd",
		deleted: "Verwijderd",
		error: "Foutmelding"
	},
	comments: {
		heading: "Reacties",
		add: "Reactie toevoegen"
	},
	drawers: {
		personal: {
			listItems: {
				notifications: "Notificaties",
				cms: "Beheer",
				chat: "Chat",
				tasks: "Taken",
				groups: "Groepen",
				mediaLibrary: "Mediabibliotheek"
			}
		}
	},
	ml: {
		// MediaLibrary
		title: "Mediabibliotheek",
		header: {
			search: "Zoeken in media",
			sorting: "Sortering"
		},
		footer: {
			add: "Media toevoegen",
			delete: "Media verwijderen",
			selected: "geselecteerd",
			use: "Media gebruiken"
		},
		filters: {
			apply: "Toepassen",
			dateEarly: "Kies een eerdere datum",
			dateLate: "Kies een latere datum",
			dateInvalid: "Kies een geldige datum",
			numberToBig: "Waarde te groot",
			numberInvalid: "Waarde moet > 0",
			numberToSmall: "Waarde te klein",
			rangeDivider: "tot",
			selectHint: "Typ om de lijst te filteren",
			selectEmpty: "Geen resultaat"
		},
		infoList: {
			author: "Auteur",
			name: "Naam",
			changed: "Datum aangepast",
			fileType: "Type",
			uploadedBy: "Geupload door",
			tags: "Labels",
			height: "Hoogte",
			width: "Breedte",
			fileName: "Bestandsnaam",
			created: "Aangemaakt",
			alt: "Alt tekst",
			caption: "Caption",
			description: "Description",
			fileSize: "Bestandsgrootte",
			size: "Afmetingen",
			download: "Downloaden",
			tagHint: "Typ om extra labels toe te voegen"
		}
	},
	tasks: {
		reportSent:
			"Je melding is succesvol ontvangen. Mocht je nog vragen hebben, gebruik dan de volgende code in je communicatie met onze helpdesk: {0}.",
		saveChanges: {
			code: "TSKx0000",
			title: "Wijzigingen opslaan",
			description: "De wijzigingen worden opgeslagen. Je kunt ondertussen gewoon doorwerken.",
			done: "De wijzigingen zijn succesvol opgeslagen.",
			failed: "Er is een fout opgetreden bij het opslaan van de wijzigingen ({0})."
		},
		setFile: {
			code: "TSKx0001",
			title: "Afbeelding instellen",
			description: "De gekozen afbeelding wordt ingesteld.",
			done: "De gekozen afbeelding is succesvol ingesteld.",
			failed: "Er is een fout opgetreden bij het instellen van de gekozen afbeelding ({0})."
		},
		deleteItem: {
			code: "TSKx0002",
			title: "Item verwijderen",
			description: "Het item wordt verwijderd.",
			done: "Het item is succesvol verwijderd.",
			failed: "Er is een fout opgetreden bij het verwijderen van het item ({0})."
		},
		addItem: {
			code: "TSKx0003",
			title: "Item toevoegen",
			description: "Het item wordt toegevoegd.",
			done: "Het item is succesvol toegevoegd.",
			failed: "Er is een fout opgetreden bij het toevoegen van het item ({0})."
		},
		login: {
			code: "TSKx0004",
			title: "Inloggen",
			description: "Bezig met inloggen...",
			done: "Je bent succesvol ingelogd.",
			failed: "Er is een fout opgetreden bij het inloggen ({0})."
		},
		logout: {
			code: "TSKx0005",
			title: "Uitloggen",
			description: "Bezig met uitloggen...",
			done: "Je bent succesvol uitgelogd.",
			failed: "Er is een fout opgetreden bij het uitloggen ({0})."
		}
	},
	users: {
		name: "Naam",
		firstName: "Voornaam",
		middleName: "Tussenvoegsel",
		lastName: "Achternaam",
		avatar: "Profielfoto",
		birthDay: "Geboortedatum",
		occupation: "Functie/beroep",
		sex: "Geslacht",
		male: "Man",
		female: "Vrouw"
	},
	dialogs: {
		deleteFile: {
			title: "{0} verwijderen",
			message: "Weet je zeker dat je de {0} wilt verwijderen?",
			resolve: "Verwijderen",
			reject: "Annuleren"
		},
		deleteItem: {
			title: "Item verwijderen",
			message: "Weet je zeker dat je het item wilt verwijderen?",
			resolve: "Verwijderen",
			reject: "Annuleren"
		},
		login: {
			title: "Inloggen",
			resolve: "Inloggen",
			reject: "Annuleren",
			email: "E-mailadres",
			password: "Wachtwoord",
			invalidEmail: "Ongeldig e-mailadres",
			invalidPassword: "Ongeldig wachtwoord",
			requiredEmail: "E-mailadres verplicht",
			requiredPassword: "Wachtwoord verplicht"
		},
		error: {
			title: "Foutmeldingen",
			resolve: "Sluiten",
			reject: "Leegmaken",
			moreInfo: "Meer informatie",
			lessInfo: "Minder informatie"
		},
		warning: {
			title: "Waarschuwingen",
			resolve: "Sluiten",
			reject: "Leegmaken",
			moreInfo: "Meer informatie",
			lessInfo: "Minder informatie"
		},
		confirmUnsaved: {
			title: "Edit modus verlaten",
			message:
				"Je hebt nog onopgeslagen wijzigingen, deze gaan verloren als je niet opslaat voor je de edit modus verlaat.",
			resolve: "Verlaten",
			reject: "Annuleren"
		},
		imageEdit: {
			title: "Plaatje aanpassen",
			resolve: "Opslaan",
			reject: "Annuleren"
		}
	},
	errors: {
		unauthorized: {
			code: "401",
			title: "Niet geautoriseerd",
			description: "Je bent niet geautoriseerd om deze pagina te bekijken. Log in als een (andere) gebruiker."
		},
		pageNotFound: {
			code: "404",
			title: "Pagina niet gevonden",
			description:
				"De pagina bestaat niet (meer). Mogelijke oorzaken: de pagina is verplaatst, de pagina is niet gepubliceerd of de pagina staat in de prullenbak."
		},
		invalidApiCall: {
			code: "ERRx0000",
			title: "Fout bij het uitvoeren van de API aanroep",
			description: "Er is een fout opgetreden bij het uitvoeren van de {0} aanroep."
		},
		unableToLoadApiInfo: {
			code: "ERRx0001",
			title: "Fout in de communicatie met de server.",
			description:
				"Probeer het opnieuw of herlaad de pagina. Als het probleem aanhoud druk dan op 'Probleem melden'."
		},
		unableToLoadTheme: {
			code: "ERRx0002",
			title: "Fout bij het laden van het thema",
			description: "Er is een fout opgetreden bij het laden van het {0} thema."
		},
		unableToLoadComponent: {
			code: "ERRx0003",
			title: "Fout bij het laden van het component",
			description: "Er is een fout opgetreden bij het laden van het component."
		},
		unableToLoadComponentOrSubComponent: {
			code: "ERRx0004",
			title: "Fout bij het laden van het component of sub component",
			description:
				"Er is een fout opgetreden bij het laden van het {0} component of het {1} component in het {2} thema."
		},
		unableToLoadTemplate: {
			code: "ERRx0005",
			title: "Fout bij het laden van het template",
			description: "Er is een fout opgetreden bij het laden van het template."
		},
		unableToLoadTemplateComponent: {
			code: "ERRx0006",
			title: "Fout bij het laden van het template component",
			description: "Er is een fout opgetreden bij het laden van het template component."
		},
		unableToLoadHostInfo: {
			code: "ERRx0007",
			title: "Fout bij het laden van de host informatie",
			description: "Er is een fout opgetreden bij het laden van de host informatie."
		},
		unableToLoadMenu: {
			code: "ERRx0008",
			title: "Fout bij het laden van het menu",
			description: "Er is een fout opgetreden bij het laden van het menu."
		},
		unableToLoadPageMenuItems: {
			code: "ERRx0009",
			title: "Fout bij het laden van de pagina menu items",
			description: "Er is een fout opgetreden bij het laden van de pagina menu items."
		},
		unableToLoadElement: {
			code: "ERRx0010",
			title: "Fout bij het laden van het element",
			description: "Er is een fout opgetreden bij het laden van het '{0}' element."
		},
		invalidGuid: {
			code: "ERRx0011",
			title: "Ongeldig GUID",
			description: "Het opgegeven GUID is ongeldig."
		},
		noSelectedFiles: {
			code: "ERRx0012",
			title: "Geen bestanden geselecteerd",
			description: "Er zijn geen bestanden geselecteerd."
		},
		noTargetItem: {
			code: "ERRx0013",
			title: "Geen item geselecteerd",
			description: "Er is geen item geselecteerd."
		},
		invalidUserIdAndGuid: {
			code: "ERRx0014",
			title: "Ongeldige user aanvraag",
			description: "Er is geen userId of userGuid meegegeven."
		},
		invalidEmailOrPassword: {
			code: "ERRx0016",
			title: "Ongeldig e-mailadres of wachtwoord",
			description: "Het opgegeven e-mailadres of wachtwoord is ongeldig."
		},
		templateNotFound: {
			code: "ERRx0017",
			title: "Fout bij het laden van het template",
			description: "Het template met ID {0} kon niet worden gevonden in de store."
		},
		unableToLoadFiles: {
			code: "ERRx0018",
			title: "Fout bij het laden van de bestanden",
			description: "Er is een fout opgetreden bij het laden van de bestanden."
		},
		invalidDataForLoadingMode: {
			code: "ERRx0019",
			title: "De data kan niet in de store opgeslagen worden.",
			description:
				"De data van type {0} kan niet met loading mode {1} in storeItem {2} van type {3} geplaatst worden."
		},
		unableToShowDialog: {
			code: "ERRx0020",
			title: "Fout bij het tonen van de dialoog",
			description: "De dialoog met de naam {0} kon niet worden getoond"
		},
		invalidArgument: {
			code: "ERRx0021",
			title: "Ongeldig argument meegegeven",
			description: "Het {0}e argument in '{1}' is (een) '{2}'. Dit is niet toegestaan."
		},
		unableToDeleteFile: {
			code: "ERRx0022",
			title: "Fout bij het verwijderen van het bestand",
			description: "Er is een fout opgetreden bij het verwijderen van het bestand."
		},
		unableToDeleteFiles: {
			code: "ERRx0023",
			title: "Fout bij het verwijderen van de bestanden",
			description: "Er is een fout opgetreden bij het verwijderen van de bestanden."
		},
		unableToSelectFileForItem: {
			code: "ERRx0024",
			title: "Fout bij het koppelen van een bestand aan het item",
			description: "Er is een fout opgetreden bij het koppelen van een bestand aan een item."
		},
		unableToLoadPageData: {
			code: "ERRx0025",
			title: "Fout bij het laden van de pagina data",
			description: "Er is een fout opgetreden bij het laden van de pagina data."
		},
		unableToSetFile: {
			code: "ERRx0026",
			title: "Fout bij het instellen van het bestand",
			description: "Probeer het opnieuw. Mocht dit niet lukken druk dan op 'Probleem melden'."
		},
		unableToDeleteItem: {
			code: "ERRx0027",
			title: "Fout bij verwijderen van het item",
			description: "Probeer het opnieuw. Mocht dit niet lukken druk dan op 'Probleem melden'."
		},
		unableToCompleteTask: {
			code: "ERRx0028",
			title: "Fout bij het uitvoeren van '{0}'",
			description: "Probeer het opnieuw. Mocht dit niet lukken druk dan op 'Probleem melden'."
		},
		unableToJsonParseValue: {
			code: "ERRx0029",
			title: "Fout bij het omzetten van een JSON tekst naar een object",
			description: "Er is een fout opgetreden bij het omzetten van een JSON tekst naar een object."
		},
		pageItemNotFound: {
			code: "ERRx0030",
			title: "Geen pagina item gevonden voor {0}",
			description: "Het pagina item {0} bij URL {1} bestaat niet."
		},
		containerItemNotFound: {
			code: "ERRx0031",
			title: "Geen container item gevonden voor {0}",
			description: "Het container item {0} bij URL {1} bestaat niet."
		},
		unableToLoadApplicationUser: {
			code: "ERRx0032",
			title: "Fout bij het laden van de gebruiker",
			description: "Probeer te pagina te herladen. Mocht dit niet lukken druk dan op 'Probleem melden'."
		}
	}
};
