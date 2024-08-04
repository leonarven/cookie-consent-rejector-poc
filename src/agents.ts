
/** @ts-ignore */
import CookieConsentFormExistenceFinderInstruction from "../agents/CookieConsentFormExistenceFinder.instruction.txt";
/** @ts-ignore */
import CookieConsentFormFinderInstruction          from "../agents/CookieConsentFormFinder.instruction.txt";
/** @ts-ignore */
import CookieConsentFormRejectHandlerInstruction   from "../agents/CookieConsentFormRejectHandler.instruction.txt";
import { runAgent } from "./utils";

abstract class LLMAgent implements ILLMAgent {
    abstract label: string;
    abstract instruction: string;
    abstract run( text: string ): Promise<any>;
}

export class CookieConsentFormExistenceFinder extends LLMAgent implements ILLMAgent {
    label = "CookieConsentFormExistenceFinder";
    instruction = CookieConsentFormExistenceFinderInstruction;
    async run( text: string ): Promise<CookieConsentFormExistenceFinderOutput> {
        console.debug( this.label, "run", arguments );
        let json = await runAgent( this, text );
        return json as CookieConsentFormExistenceFinderOutput;
    }
}
export class CookieConsentFormFinder extends LLMAgent {
    label = "CookieConsentFormFinder";
    instruction = CookieConsentFormFinderInstruction;
    async run( html: string ): Promise<CookieConsentFormFinderOutput> {
        console.debug( this.label, "run", arguments );
        let json = await runAgent( this, html );
        return json as CookieConsentFormFinderOutput;
    }
}
export class CookieConsentFormRejectHandler extends LLMAgent {
    label = "CookieConsentFormRejectHandler";
    instruction = CookieConsentFormRejectHandlerInstruction;
    async run( html: string ): Promise<CookieConsentFormRejectHandlerOutput> {
        console.debug( this.label, "run", arguments );
        let json = await runAgent( this, html );
        return json as CookieConsentFormRejectHandlerOutput;
    }
}