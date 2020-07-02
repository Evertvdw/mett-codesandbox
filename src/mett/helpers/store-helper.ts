import { IStoreItemData } from "src/store/load-optimizer/types";
import { IError } from "src/store/error/types";
import { ArgumentType, ArgumentDefinition } from "./types";
import { i18n } from "src/boot/i18n";
import { Dispatch } from "vuex";
import { ISettingsState } from "src/store/settings/types";
import { Notify } from "quasar";
import { log } from "src/boot/logger";

export function getStoreItemDataByPath(state: any, path: string): IStoreItemData | undefined {
	const pathPieces = path.split("/");
	if (pathPieces.length < 2) return undefined;
	let currentModule = state;
	const targetItem = pathPieces.pop() as string;

	for (const i in pathPieces) {
		currentModule = currentModule[pathPieces[i]];
	}

	if (currentModule === undefined || currentModule[targetItem] === undefined) return undefined;

	return { module: currentModule, item: targetItem };
}

export function invalidArgument(dispatch: Dispatch, actionName: string, argumentList: ArgumentDefinition[]) {
	let returnValue = false;

	for (const index in argumentList) {
		let typeOfArgument: ArgumentType = (ArgumentType as any)[typeof argumentList[index].value];
		let allowedTypes: ArgumentType[];
		let isValid = false;

		if (argumentList[index].type) allowedTypes = argumentList[index].type as ArgumentType[];
		else {
			allowedTypes = [
				ArgumentType.any,
				ArgumentType.object,
				ArgumentType.string,
				ArgumentType.number,
				ArgumentType.boolean,
				ArgumentType.function,
				ArgumentType.array,
				ArgumentType.symbol
			];
		}

		if (typeOfArgument == ArgumentType.object) {
			if (argumentList[index].value == null) typeOfArgument = ArgumentType.null;
			else if (Array.isArray(argumentList[index].value)) typeOfArgument = ArgumentType.array;
		} else if (typeOfArgument == ArgumentType.number && isNaN(argumentList[index].value))
			typeOfArgument = ArgumentType.NaN;

		if (allowedTypes.indexOf(typeOfArgument) > -1) isValid = true;
		else if (allowedTypes.indexOf(ArgumentType.any) > -1) isValid = true;

		if (!isValid) {
			const warning: IError = {
				code: i18n.t("errors.invalidArgument.code"),
				title: i18n.t("errors.invalidArgument.title"),
				message: i18n.t("errors.invalidArgument.description", [
					parseInt(index) + 1,
					actionName,
					typeOfArgument
				]),
				timestamp: new Date()
			};

			dispatch("error/addWarning", warning, { root: true });

			returnValue = true;
		}
	}

	return returnValue;
}

export function reportError(error: IError) {
	if (error) {
		log(
			{
				short_message: `[_ID_] | Error ${error.code} reported by user`,
				full_message: error.message,
				level: 2
			},
			{
				error: error
			}
		);
	}
}

export function showReportNotification(error: IError, settings: ISettingsState) {
	Notify.create({
		message: error.title,
		caption: error.message,
		group: error.code,
		type: "negative",
		multiLine: true,
		timeout: settings.tasks.timeout.long,
		actions: [
			{
				label: i18n.t("buttons.cancel"),
				color: "white",
				handler: () => {}
			},
			{
				label: i18n.t("buttons.reportBug"),
				color: "yellow",
				handler: () => {
					reportError(error);
				}
			}
		]
	});
}
