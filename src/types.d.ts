type CookieConsentFormExistenceFinderOutput = {
    hasCookieConsentForm: boolean;
};

type CookieConsentFormFinderOutput = {
    cookieConsentFormSelector: string;
};

type CookieConsentFormRejectHandlerOutput = {
    steps: CCIStep[];
};

type CCIStepBase = {
    selector: string;
    action: "setCheckboxValue" | "setInputValue" | "click";
};

type CCIStepSetCheckboxValue = CCIStepBase & {
    action: "setCheckboxValue";
    value: boolean;
};

type CCIStepSetInputValue = CCIStepBase & {
    action: "setInputValue";
    value: string | number | "checked";
};

type CCIStepClick = CCIStepBase & {
    action: "click";
};

type CCIStep = CCIStepSetCheckboxValue | CCIStepSetInputValue | CCIStepClick;

interface ILLMAgent {
    
    label: string;
    instruction: string;
    
    run( prompt: string ): Promise<any>;
}