import React, { FunctionComponent } from "react";
import PageTemplate from "../PageTemplate";

import {
    aboutContainer,
    aboutDetailsContainer
} from "./index.scss";


const About: FunctionComponent = () => {

    return <div>
        <PageTemplate >
            <div className={aboutContainer}>
                <div className={aboutDetailsContainer}>
                    <h3>About</h3>
                    <p>
                        Hey! Thanks for checking out my app "Spotifriends" and for also checking out the
                        about page for my app too! This was built to play with some apis, in this case the <a href="https://developer.spotify.com/documentation/">spotify
                        api's</a> and then leverage them to  build something cool and potentially useful.
                    </p>
                    <p>
                        During the trying times of lockdown "Spotifriends" is my attempt to create a shared music space,
                        where you can listen to music with all your friends remotely! You create a room, all your friends join,
                        adding tracks to a shared playlist and the app will synchronise play across all the connected
                        devices so you can listen to the same playlist at the same time! You can skip tracks and join midway too!
                    </p>
                    <p>
                        I am Dominic Jomaa, a software engineer with a passion for design, music and all things
                        computer related! Find me on my <a href="https://github.com/paperschool">github</a> or at my <a href="https://onosendai.space">website</a>
                    </p>
                </div>
            </div>
        </PageTemplate>
    </div>

}

export default About;