import React, { FunctionComponent } from "react";
import PageTemplate from "../PageTemplate";

import FAQS from "./faqs.json";

import {
    faqsContainer,
    faqsDetailsContainer,
    faqContainer
} from "./index.scss";


const FAQ: FunctionComponent = () => {

    return <PageTemplate >
        <div className={faqsContainer}>
            <h3>FAQ</h3>
            <div className={faqsDetailsContainer}>
                {
                    FAQS.map((faq: any) => (
                        <div className={faqContainer}>
                            <h4>{faq.question}</h4>
                            <p>{faq.answer}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </PageTemplate>


}

export default FAQ;