const Utils = {

    decodeValue(valueToDecode: string){
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(valueToDecode, 'text/html').body.textContent;
        return decodedString != null ? decodedString : '';
    },

    getRandomItems(options: string[]): string[]{

        var currentIndex = options.length, temporaryValue, randomIndex;

        while(currentIndex !== 0){
        
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = options[currentIndex];
            options[currentIndex] = options[randomIndex];
            options[randomIndex] = temporaryValue;

        }

        return options;

    },

    

};

export default Utils;