import { CookieConsentFormExistenceFinder, CookieConsentFormFinder, CookieConsentFormRejectHandler } from "./agents";
import { CCF_SELECTOR_INVALID, CCF_TEXT_HAS_NO_COOKIE_CONSENT_FORM, DOCUMENT__BODY_HAS_NO_COOKIE_CONSENT_FORM } from "./errors";
import { htmlFromHtmlBySelector, htmlToText } from "./utils";

export async function handleCCF( html: string ) {

    const fExistenceFinder = new CookieConsentFormExistenceFinder(); 
    const fFinder          = new CookieConsentFormFinder();
    const fRejectHandler   = new CookieConsentFormRejectHandler();

    let text = htmlToText( html );

    let output_a: CookieConsentFormExistenceFinderOutput;
    let output_b: CookieConsentFormFinderOutput;
    let output_c: CookieConsentFormRejectHandlerOutput;

    /**
     * 1. Check if there is a cookie consent form
     */
    output_a = await fExistenceFinder.run( text );

    if (!output_a.hasCookieConsentForm) {
        throw DOCUMENT__BODY_HAS_NO_COOKIE_CONSENT_FORM;
    }

    /**
     * 2. Find selector for the cookie consent form
     */
    output_b = await fFinder.run( html );

    let { cookieConsentFormSelector: ccf_selector } = output_b;

    let ccf_html = htmlFromHtmlBySelector( html, ccf_selector );

    // Check if selector is valid
    if (!ccf_html) {
        throw CCF_SELECTOR_INVALID;
    }

    {   // Re-check if there still is a cookie consent form
        // If not, the selector must be wrong
        let ccf_text = htmlToText( ccf_html );

        output_a = await fExistenceFinder.run( ccf_text );

        if (!output_a.hasCookieConsentForm) {
            throw CCF_TEXT_HAS_NO_COOKIE_CONSENT_FORM;
        }
    }

    /**
     * 3. Handle the cookie consent form
     */
    output_c = await fRejectHandler.run( ccf_html );

    console.log( output_c );
    
    return output_c;
}