class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // replace with story title from JSON
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // replace with initial location from JSON
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // use key to get data for current story location
        this.engine.show(locationData.Body); // replace with body of location data

        if (locationData.Choices) { // check if location has choices
            for (let choice of locationData.Choices) { // loop over location's choices
                this.engine.addChoice(choice.Text, choice); // use the text of the choice and pass the whole choice object as data
            }
        } else {
            this.engine.addChoice("The end."); // if no choices, add an ending choice
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target); // transition to target location
        } else {
            this.engine.gotoScene(End); // go to end scene if no choice
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits); // show credits from JSON
    }
}

Engine.load(Start, 'myStory.json');