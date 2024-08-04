type CookieConsentFormExistenceFinderOutput = {
    hasCookieConsentForm: boolean;
};

type CookieConsentFormFinderOutput = {
    cookieConsentFormSelector: string;
};

type CookieConsentFormRejectHandlerOutput = {
    steps: {
        selector: string;
        action: "setCheckboxValue";
        value: boolean;
    }[] | {
        selector: string;
        action: "setInputValue";
        value: string | number | "checked";
    }[] | {
        selector: string;
        action: "click";
    }[];
};

interface ILLMAgent {
    
    label: string;
    instruction: string;
    
    run( prompt: string ): Promise<any>;
}