
//Atomic Adventure 
//I'm DONE Q _ Q
const gameScreen = document.getElementById('gameScreen');
const startScreen = document.getElementById('startScreen');
const inputContainer = document.getElementById('inputContainer');
const userInput = document.getElementById('userInput');
const startButton = document.getElementById('startButton');

let experimentsCompleted = 0;

// Append a line as a separate div so CSS text-align:center applies per-line. 
function appendLine(text = '', className = '') {
    const node = document.createElement('div');
    if (className) node.className = className;
    // allow multi-line blocks preserve newlines inside the div by using textContent
    node.textContent = text;
    gameScreen.appendChild(node);
    gameScreen.scrollTop = gameScreen.scrollHeight;
}

// Clear the game screen 
function clearScreen() {
    gameScreen.innerHTML = '';
}

// printWithDelay prints the text then waits....idk how long?
function printWithDelay(text, ms = 800) {
    return new Promise(resolve => {
        appendLine(text);
        setTimeout(resolve, ms);
    });
}

// promptUser shows optional prompt text and waits for the player to press Enter.
// Returns the trimmed user input string. (ps: took me 3 hours to figure out how to run it)
function promptUser(promptText = '') {
    return new Promise(resolve => {
        if (promptText) appendLine(promptText, 'prompt');
        inputContainer.style.display = 'flex';
        userInput.focus();

        function submit() {
            const value = userInput.value.trim();
            // append the user's answer visually, centered, in its own color
            appendLine('> ' + value, 'userAnswer');
            userInput.value = '';
            userInput.removeEventListener('keydown', onKey);
            inputContainer.style.display = 'none';
            resolve(value);
        }

        function onKey(e) {
            if (e.key === 'Enter') {
                submit();
            }
        }

        userInput.addEventListener('keydown', onKey);
    });
}

// alias to match previous code naming
async function ask(promptText = '') {
    return await promptUser(promptText);
}

// Start button behavior
startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    inputContainer.style.display = 'flex';
    userInput.focus();
    startGame().catch(err => appendLine('Error: ' + err.message));
});

// Allow start by keyboard when focused
startButton.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') startButton.click();
});

//Game flow (full scenes converted) -----

async function startGame() {
    clearScreen();
    await intro();
}

// SCENE 0: INTRODUCTION
async function intro() {
    await printWithDelay('Welcome to the Atomic Adventure!');
    await printWithDelay('As you travel through time, you will learn about the evolution of the atomic models with scientists by running experiments and test theories!');
    await printWithDelay('\nGoal: Complete at least three successful experiments and unlock the Quantum ending!');
    await printWithDelay('\nChoice A: Travel to the 1800’s and meet John Dalton');
    await printWithDelay('Choice B: Skip to 1904 and meet J.J. Thomson');
    let command = (await ask('Your choice (a/b): ')).trim().toLowerCase();

    if (command === 'a') {
        await dalton();
    } else if (command === 'b') {
        await printWithDelay('Skipping to J.J. Thomson…');
        await JJThomson();
    } else {
        await printWithDelay('Not a valid choice. Try again!');
        await intro();
    }
}

// SCENE 1: DALTON AND HIS CANNONBALL MODEL
async function dalton() {
    await printWithDelay('\nTraveling back centuries is not an easy feat!');
    await printWithDelay('But it allows you to see the full story, and one like Dalton’s!');
    await printWithDelay('Observe his youthful days or straight to his theory (youth/theory)?');
    let command = (await ask()).trim().toLowerCase();

    if (command === 'youth') {
        await printWithDelay("As you observe his days as a kid born in 1766 in Cumberland, England traverse his days in education, working as a teacher at 12 and later co-managing a boarding school in Kendal.");
        await printWithDelay("Later in 1793, Dalton moved to Manchester and joined the Manchester Literary and Philosophical Society that motivated him to publish “A New System of Chemical Philosophy” in 1808.");
        await printWithDelay("As you go closer to observe Dalton you hear a BOOM…");
        await daltonTheory();
    } else if (command === 'theory') {
        await daltonTheory();
    } else {
        await printWithDelay('Invalid input, returning to Dalton’s scene.');
        await dalton();
    }
}

async function daltonTheory() {
    await printWithDelay('\n(In a room full of books and papers, you stumble across to find Dalton doodling circles)');
    await printWithDelay('Dalton: Blast it all! Woah! How did you get here?');
    await printWithDelay("Choice 1: I'm a time traveller!");
    await printWithDelay('Choice 2: I heard the commotion.');
    await printWithDelay('Choice 3: Silence');
    await ask(); // pause, no need to use input
    await printWithDelay("Dalton: Nevermind…I suppose I should put those hands of yours to work. Here, hold this! My name is John Dalton, I’m a fellow researcher, a teacher, and occasionally mix up colors!");
    await printWithDelay('(Dalton looks at your clothes)');
    await printWithDelay('I think they’re red or is it…. green?');
    let colorChoice = await ask('Choice 1: It’s green!\nChoice 2: It’s red!\nYour choice: ');
    // ignoring the actual answer; original code also didn't use it
    await printWithDelay("Dalton grins as you talk to him: Nevermind. Lets focus on what I’m good at! You’ve arrived just in time for the creation of a new theory!");
    await printWithDelay('All matter is made of tiny, indivisible atoms!');

    await daltonKeyPoints();
}

async function daltonKeyPoints() {
    await printWithDelay('\nWhat key point do you want him to explain?');
    await printWithDelay('A: Atoms are indivisible');
    await printWithDelay('B: Atoms of the same element are identical');
    await printWithDelay('C: Atoms of different elements are different');
    await printWithDelay('D: Compounds are formed by simple ratios');
    await printWithDelay('E: Atoms rearrange in reactions');
    let command = (await ask('Your choice (a/b/c/d/e): ')).trim().toLowerCase();

    switch (command) {
        case 'a':
            await printWithDelay("\nDalton: The atom is the smallest particlepiece of matter that cannot be split into smaller pieces, it can't be created from nothing or disappear. They are the building blocks of everything around us. When the matter changes, the atoms do not change but rearrange instead.");
            await nextPoint('b');
            break;
        case 'b':
            await printWithDelay("\nDalton: All atoms of the same element are identical, they have the same mass and properties. Every carbon atom is the same as every other carbon atom! This allows us to measure substances and predict reactions!");
            await nextPoint('c');
            break;
        case 'c':
            await printWithDelay("\nDalton: Atoms of one element are not the same as the atoms of another element. For example, Hydrogen atoms have a different mass and different reactions with their surroundings compared to oxygen atoms. This is why each element is unique.");
            await nextPoint('d');
            break;
        case 'd':
            await printWithDelay("\nDalton: The atoms of different atoms can combine by simple, whole number ratios to form compounds. Water is a compound that always forms two hydrogen atoms and one oxygen atom. This ratio is always consistent and the start of chemical formulas.");
            await printWithDelay('Choice A1: Test this theory by weighing the two different gases and see how they combine in fixed ratios.');
            await printWithDelay('Choice A2: Do you want to go to the main page or continue to E?');
            let sub = (await ask('Your choice (test/next): ')).trim().toLowerCase();
            if (sub === 'test') {
                await printWithDelay("\nDalton smiles. Pleased with your idea. Exactly! This is my law of multiple proportions! When we combine carbon and hydrogen, do we get the same mass every time?");
                await printWithDelay("You carefully weigh the elements and jot down the data. It seems that that combination of 1 gram of carbon combines with 2.67 grams of oxygen creating Carbon Dioxide every time!");
                await printWithDelay("Wonderful! Dalton furiously jots this down in his notes. Dalton beams proudly, “You are now my assistant!”");
                experimentsCompleted++;
            }
            await nextPoint('e');
            break;
        case 'e':
            await printWithDelay("\nDalton: When there is a chemical reaction, the atoms are not created or destroyed, rather, they are rearranged to make the new matter/ substance. For example when hydrogen reacts with oxygen to make water, the hydrogen and oxygen rearrange themselves, conserving the total mass.");
            let go = (await ask("Do you want to go to the main page or help Dalton with another experiment? (main/color): ")).trim().toLowerCase();
            if (go === 'main') await intro();
            else if (go === 'color') await daltonColor();
            else await daltonKeyPoints();
            break;
        default:
            await printWithDelay('Invalid input.');
            await daltonKeyPoints();
    }
}

async function nextPoint(next) {
    let command = (await ask(`\nDo you want to go to the main page or continue to ${next.toUpperCase()}? (main/${next}): `)).trim().toLowerCase();
    if (command === 'main') await intro();
    else if (command === next) await daltonKeyPoints();
    else daltonKeyPoints();
}

async function daltonColor() {
    await printWithDelay('\nDalton presents you with his unfinished research, “Extraordinary Facts Relating to the Vision of Colours with Observations”');
    await printWithDelay('Dalton: I think I have found a reason why I perceive this world differently than others!');
    let command = (await ask('Choice: Help him finish his research? (yes/no): ')).trim().toLowerCase();

    if (command === 'yes') {
        await printWithDelay('\nDalton: Fabulous! We must publish this right away!');
        await printWithDelay('(Dalton runs off as you stand there, preparing yourself to time travel again. You wish Dalton the best of luck)');
        await printWithDelay('Time to move on to J.J. Thomson!');
        await JJThomson();
    } else {
        await printWithDelay('Dalton nods and continues scribbling notes. You quietly step away, ready for your next journey.');
        await printWithDelay('Time to move on to J.J. Thomson!');
        await JJThomson();
    }
}

// THOMSON SCENE 2: PLUM PUDDING MODEL
async function JJThomson() {
    await printWithDelay('J.J Thomson and his Plum Pudding Model');
    await printWithDelay("\nYou arrived in a time of the electric revolution! Walking into a lab filled with antique-like instruments, a man is playing with cathode rays? Is that J.J Thomson?");
    await printWithDelay('\nChoice:\nA1: Walk up to him and introduce yourself\nA2: Explore the lab?');
    let choice1 = (await ask()).trim().toUpperCase();

    if (choice1 === 'A1') {
        await walkUpToThomson();
    } else if (choice1 === 'A2') {
        await exploreLab();
    } else {
        await printWithDelay("Invalid choice. Let's walk up to him by default.");
        await walkUpToThomson();
    }
}

async function walkUpToThomson() {
    await printWithDelay('As you decide to walk over, he spots you and ushers you forward.');
    await printWithDelay('“Sorry for the late introduction! I am a visitor from a far far away”');
    await printWithDelay('Thomson: “No worries, it is impressive to see someone in my lab unscathed! With that talent, come here and help me! I am currently experimenting with electrons and atomic structure.”');
    await printWithDelay('Thomson shows you the cathode ray tube:');
    await printWithDelay('Thomson: Imagine this atom as a pudding, it is positively charged with tiny negatively charged electrons embedded in the atom or pudding…randomly! Like a plum pudding!');

    await printWithDelay('\nWhich part of the pudding would you like to explore?');
    await printWithDelay('A: Positive sphere\nB: Embedded electrons\nC: Neutral charge\nD: Uniform mass');
    let choice = (await ask()).trim().toUpperCase();

    if (choice === 'A') await positiveSphere();
    else if (choice === 'B') await embeddedElectrons();
    else if (choice === 'C') await neutralCharge();
    else if (choice === 'D') await uniformMass();
    else {
        await printWithDelay('Invalid choice. Exploring Positive Sphere by default.');
        await positiveSphere();
    }
}

async function exploreLab() {
    await printWithDelay('(The lab was filled with papers, books, little models of atoms, and some other things?)');
    await printWithDelay('(Thomson notices you lurking around the lab after a bit, he eyes you curiously)');
    await printWithDelay('Thomson: “Snooping around my lab are you? Unfortunately for you all my data is scattered around the lab almost impossible to find. Trust me. I tried….”');
    await printWithDelay('You: “Not at all! I was…um actually amazed by this lab so I wanted to look around while waiting for you.”');
    await printWithDelay('Thomson: “Is that so! Then I am sorry for keeping you waiting for however long. I tend to get too focused on my projects at times. But come and look!”');
    await printWithDelay("(You see him next to a half-eaten plum pudding…no wonder it smells so good in here!)");
    await printWithDelay('Thomson: “Wait, not that! I mean my papers on electrons! AND the atomic structure.”');
    await printWithDelay('“Think about an atom as a pudding, it is positively charged with tiny negatively charged electrons embedded in the atom or pudding…randomly! Like a plum pudding!”');

    await printWithDelay('\nWhich part of the pudding would you like to explore?');
    await printWithDelay('A: Positive sphere\nB: Embedded electrons\nC: Neutral charge\nD: Uniform mass');
    let choice = (await ask()).trim().toUpperCase();

    if (choice === 'A') await positiveSphere();
    else if (choice === 'B') await embeddedElectrons();
    else if (choice === 'C') await neutralCharge();
    else if (choice === 'D') await uniformMass();
    else {
        await printWithDelay('Invalid choice. Exploring Positive Sphere by default.');
        await positiveSphere();
    }
}

async function positiveSphere() {
    await printWithDelay('Thomson: The atom consists of a sphere of positively charged matter. It is like a pudding that fills the entire atom’s volume. This positive charge pudding is continuous, holding everything inside the atom together evenly and giving it a shape.');
    await printWithDelay('(Thomson points to the cathode ray tube)');
    await printWithDelay('When electricity passes through the tube, the cathode rays bends toward the positive plate! This means the rays are negatively charged and in order to keep the negatively charged particles inside the atoms, the positive charge must be evenly spread out throughout the atoms holding it together! If not, they might explode?');

    let choice = (await ask('Do you want to go back to start or continue to B (Embedded Electrons)? (start/b): ')).trim().toLowerCase();

    if (choice === 'start') await JJThomson();
    else if (choice === 'b') await embeddedElectrons();
    else {
        await printWithDelay('Invalid choice. Continuing to Embedded Electrons by default.');
        await embeddedElectrons();
    }
}

async function embeddedElectrons() {
    await printWithDelay('Thomson: The negative particles or rays are called electrons, they are thousands of times smaller than an atom and are embedded inside the positively charged atom. The electrons are scattered around and balance with the positive charge like the plums in the pudding. Together the positive and negative particles keep the atom stable.');
    await printWithDelay('Did you know? I called electrons corpuscles!');

    let choice = (await ask('Do you want to go back to start or continue to C (Neutral Charge)? (start/c): ')).trim().toLowerCase();

    if (choice === 'start') await JJThomson();
    else if (choice === 'c') await neutralCharge();
    else {
        await printWithDelay('Invalid choice. Continuing to Neutral Charge by default.');
        await neutralCharge();
    }
}

async function neutralCharge() {
    await printWithDelay('Thomson: Although the atom has a negative charge and a positive charge, it does not have a charge overall, this is because the positive and negative charges are equal and cancel each other out.');
    await printWithDelay('(Thomson presents the cathode ray tube once again)');
    await printWithDelay('Look at this beam. When the beam is charged, it bends. However when the charges in the tub are balanced, the beam is balanced and nothing happens. This explains the balance of nature and why most substances do not shock you every time you touch them!');

    let choice = (await ask('Do you want to go back to start or continue to D (Uniform Mass)? (start/d): ')).trim().toLowerCase();

    if (choice === 'start') await JJThomson();
    else if (choice === 'd') await uniformMass();
    else {
        await printWithDelay('Invalid choice. Continuing to Uniform Mass by default.');
        await uniformMass();
    }
}

async function uniformMass() {
    await printWithDelay('Thomson: In my plum pudding model, the positive charge spread evenly across the atom also gives its weight. This means that the mass of the atom is distributed evenly throughout. I also discovered that the charge to mass ratio was the same no matter what metal was used in the cathode.');

    let choice = (await ask("Do you want to go back to start or continue to Thomson’s story? (Family)? (start/family): ")).trim().toLowerCase();

    if (choice === 'start') await JJThomson();
    else if (choice === 'family') await familyScene();
    else {
        await printWithDelay('Invalid choice. Continuing to Thomson’s story by default.');
        await familyScene();
    }
}

async function familyScene() {
    await printWithDelay('J.J Thomson and his Son');
    await printWithDelay('Time passes by…');
    await printWithDelay('You appear again in the bright lab still stacked high with papers, but now you see an aged J.J Thomson reading a letter sent by his son');
    await printWithDelay('“Father! I bet you will be so proud of what I discovered! Electrons can act like waves! I won the Nobel Prize in Physics just like you!”');
    await printWithDelay('Thomson smiles as he says quietly: “Like father, like son. I discovered the electron while you discovered the electron\'s behavior.”');
    await printWithDelay('You smile as you watch quietly in the background, I bet his son is just as hyper like he was back in his days. You murmur a small farewell as you travel forward in time again.');
    await Rutherford();
}

// SCENE 3: RUTHERFORD AND HIS NUCLEAR MODEL
async function Rutherford() {
    await printWithDelay('\nErnest Rutherford and his Nuclear Model');
    await printWithDelay('In New Zealand on a sunny day, you see a young boy surrounded by his other 11 siblings.');
    await printWithDelay('Even in his youth, Rutherford excelled academically and won scholarships to attend Nelson Collegiate School and then Canterbury College in Christchurch.');
    await printWithDelay('He then won a scholarship to study at Trinity College, Cambridge, in England, where he conducted research under J.J. Thomson.');
    await printWithDelay('\nThomson! It\'s nice to see him again…');

    await printWithDelay('\n(Years pass in a flash of lights as you travel through time. The soft hum of machinery fills your ears.)');
    await printWithDelay('You look around, and a brightly packed laboratory stands before your eyes filled with detectors and what appears to be gold foil.');

    await printWithDelay('\n(Suddenly you hear a loud voice up ahead)');
    await printWithDelay('Rutherford: Great Heavens! There are some alpha particles bouncing back! What is going on?');
    await printWithDelay('Rutherford turns to look at you just as he finished talking.');
    await printWithDelay('Rutherford: You there! Who are you exactly? You don’t seem to be my student.');

    await printWithDelay('\nHow should you answer?');
    await printWithDelay('Choice A: No sir, I’m a traveler and happened to stumble upon your office!');
    await printWithDelay('Choice B: I’m a new student who just transferred! I want to observe your experiment!');
    await printWithDelay('Choice C: I…uh…got lost?');
    let command = (await ask('Enter choice (A/B/C): ')).trim().toUpperCase();

    if (command === 'A') {
        await printWithDelay('\nRutherford: A traveler? From where? Cambridge perhaps? Or somewhere…much farther?');
        await printWithDelay('Rutherford grins as he gestures to you.');
        await printWithDelay('Rutherford: Oh nevermind that, such a small matter but come closer, I am about to change the history of science.');
        await goldFoil();
    } else if (command === 'B') {
        await printWithDelay('\nRutherford’s eyes light up.');
        await printWithDelay('Rutherford: A transfer student? That is quite rare, I am honored to share my work with you!');
        await printWithDelay('(He hands you a notebook filled with drawings and numbers)');
        await goldFoil();
    } else if (command === 'C') {
        await printWithDelay('\nRutherford: Lost? Certainly not! You’ve found the right place. Discoveries always start with getting lost.');
        await printWithDelay('(He hands you a pair of goggles and grins, almost devilishly)');
        await printWithDelay('Since you’re here, might as well come and help me a bit!');
        await goldFoil();
    } else {
        await printWithDelay('\nRutherford looks confused. Let\'s try again.');
        await Rutherford(); // retry
    }
}

// SCENE 3: RUTHERFORD AND HIS NUCLEAR MODEL
async function Rutherford() {
    await printWithDelay('\nErnest Rutherford and his Nuclear Model');
    await printWithDelay('In New Zealand on a sunny day, you see a young boy surrounded by his other 11 siblings.');
    await printWithDelay('Even in his youth, Rutherford excelled academically and won scholarships to attend Nelson Collegiate School and then Canterbury College in Christchurch.');
    await printWithDelay('He then won a scholarship to study at Trinity College, Cambridge, in England, where he conducted research under J.J. Thomson.');
    await printWithDelay('\nThomson! It\'s nice to see him again…');

    await printWithDelay('\n(Years pass in a flash of lights as you travel through time. The soft hum of machinery fills your ears.)');
    await printWithDelay('You look around, and a brightly packed laboratory stands before your eyes filled with detectors and what appears to be gold foil.');

    await printWithDelay('\n(Suddenly you hear a loud voice up ahead)');
    await printWithDelay('Rutherford: Great Heavens! There are some alpha particles bouncing back! What is going on?');
    await printWithDelay('Rutherford turns to look at you just as he finished talking.');
    await printWithDelay('Rutherford: You there! Who are you exactly? You don’t seem to be my student.');

    await printWithDelay('\nHow should you answer?');
    await printWithDelay('Choice A: No sir, I’m a traveler and happened to stumble upon your office!');
    await printWithDelay('Choice B: I’m a new student who just transferred! I want to observe your experiment!');
    await printWithDelay('Choice C: I…uh…got lost?');
    let command = (await ask('Enter choice (A/B/C): ')).trim().toUpperCase();

    if (command === 'A') {
        await printWithDelay('\nRutherford: A traveler? From where? Cambridge perhaps? Or somewhere…much farther?');
        await printWithDelay('Rutherford grins as he gestures to you.');
        await printWithDelay('Rutherford: Oh nevermind that, such a small matter but come closer, I am about to change the history of science.');
        await goldFoil();
    } else if (command === 'B') {
        await printWithDelay('\nRutherford’s eyes light up.');
        await printWithDelay('Rutherford: A transfer student? That is quite rare, I am honored to share my work with you!');
        await printWithDelay('(He hands you a notebook filled with drawings and numbers)');
        await goldFoil();
    } else if (command === 'C') {
        await printWithDelay('\nRutherford: Lost? Certainly not! You’ve found the right place. Discoveries always start with getting lost.');
        await printWithDelay('(He hands you a pair of goggles and grins, almost devilishly)');
        await printWithDelay('Since you’re here, might as well come and help me a bit!');
        await goldFoil();
    } else {
        await printWithDelay('\nRutherford looks confused. Let\'s try again.');
        await Rutherford(); // retry
    }
}

async function goldFoil() {
    await printWithDelay('\nRutherford points at his experiment as a beam of alpha particles shoots at a thin sheet of gold foil surrounded by a circular fluorescent screen.');
    await printWithDelay("Rutherford: Originally, according to Thomson's model, these alpha particles should pass straight through. Yet look!");
    await printWithDelay('Some particles are deflecting back after hitting the gold foil!');
    await printWithDelay('Rutherford: See that? Most go straight through due to empty space, but the deflected ones hit a positive, dense nucleus at the center!');

    await printWithDelay('\nWhat do you ask?');
    await printWithDelay('Choice 1: Ask about the nucleus.');
    await printWithDelay('Choice 2: Ask about the empty space.');
    await printWithDelay('Choice 3: Ask what will happen to Thomson’s model.');
    let choice = (await ask('Enter choice (1/2/3): ')).trim();

    if (choice === '1') {
        await printWithDelay('\nRutherford: The nucleus is a tiny, positively charged center holding nearly all the atom’s mass.');
        await printWithDelay('The electrons whirl around it like planets around the sun. My atom is a miniature solar system!');
        await printWithDelay('Fun Fact: This completely melted the Plum Pudding Model!');
        await goldChoice2or3();
    } else if (choice === '2') {
        await printWithDelay('\nRutherford: Exactly! Imagine an atom the size of a football field. The nucleus is a small marble in the center, electrons are tiny stars far away.');
        await printWithDelay('Everything you see around you is mostly empty space!');
        await printWithDelay('Fun Fact: Rutherford is called the Father of Nuclear Physics.');
        await goldChoice2or3();
    } else if (choice === '3') {
        await printWithDelay("\nRutherford: Let's just say my teacher's pudding has… fallen flat.");
        await printWithDelay('Thomson’s theory of electrons is still true, but they orbit a positively charged nucleus.');
        await printWithDelay('Fun Fact: Niels Bohr later refined this model further.');
        await goldAfterword();
    } else {
        await printWithDelay('\nInvalid choice. Try again.');
        await goldFoil();
    }
}

async function goldChoice2or3() {
    await printWithDelay('\nDo you want to go back to the Gold Foil experiment or continue?');
    await printWithDelay('Choice: 1 (Back to experiment) / 2 (Continue)');
    let input = (await ask('Enter choice: ')).trim();

    if (input === '1') await goldFoil();
    else if (input === '2') await goldAfterword();
    else {
        await printWithDelay('\nInvalid choice. Let\'s continue.');
        await goldAfterword();
    }
}

async function goldAfterword() {
    await printWithDelay('\nRutherford claps his hands and pats himself.');
    await printWithDelay('Rutherford: I am proud of discovering a miniature solar system atom with electrons orbiting ittttttttt!');
    await printWithDelay('Rutherford: Gee! It is already so late! I must go train now.');
    await printWithDelay('Rutherford: A knight must stay fit to protect their beloved! It has been my greatest pleasure working with you!');
    await printWithDelay('(Rutherford runs off in a flash)');
    await printWithDelay('\nDo you want to:');
    await printWithDelay('1. Travel to meet Niels Bohr');
    await printWithDelay('2. Catch Rutherford and ask one last question');
    let next = (await ask('Enter choice (1/2): ')).trim();

    if (next === '1') await bohr();
    else if (next === '2') await askRutherfordLastQuestion();
    else {
        await printWithDelay('\nInvalid choice. Let\'s meet Bohr.');
        await bohr();
    }
}

async function askRutherfordLastQuestion() {
    await printWithDelay('\nRutherford: Oh! It’s you again! Miss me already?');
    await printWithDelay('You: Professor, what drives you to study the atom so deeply?');
    await printWithDelay('Rutherford: Because the atom is nature’s greatest secret! It holds the energy of the universe inside something invisible to the eye.');
    await printWithDelay('Rutherford: Also, it’s quite fun blowing things up in the name of science.');
    await printWithDelay('(You both laugh)');
    await bohr();
}

// SCENE 4: BOHR AND HIS PLANETARY MODEL
async function bohr() {
    await printWithDelay('\nScene 4: Niels Bohr and his Planetary Atom');
    await printWithDelay('The space around you starts to warp as your surroundings fade. You could still feel the warm and soft hum of the machines from afar, but when you open your eyes, you find Niels Bohr standing right in front of you!');
    await printWithDelay('He looks at you suspiciously...');
    await printWithDelay('Bohr: How on earth did you just…appear??');
    await printWithDelay('(You cough and look away)');
    await printWithDelay('Bohr mutters to himself: “These electrons can’t just be everywhere, they must have fixed orbits! Otherwise the atom would cease to be an atom.”');
    await printWithDelay('You glance around. The chalkboards are filled with circles and little dots revolving around a center dot.');
    await printWithDelay('Bohr: I apologize for the late introduction, I am Niels Bohr. What do you want?');

    await printWithDelay('\nChoice A: “I worked with Rutherford! Maybe I can help”');
    await printWithDelay('Choice B: “You seem busy… what are you working on?”');
    await printWithDelay('Choice C: “Niels Bohr? The physicist?”');
    let choice = (await ask('Enter choice (A/B/C): ')).trim().toUpperCase();

    if (choice === 'A') {
        await printWithDelay('\nBohr: Ah! Rutherford! My knightly mentor! His atomic model is fascinating, but it had a small problem that I am working on right now.');
        await printWithDelay("Bohr starts drawing on the board: If electrons orbit the nucleus like planets orbiting the sun, why don’t they lose energy and spiral into the nucleus? Something must be quantizing their motion.");
        await printWithDelay('(quan·tize - restrict a quantity to certain discrete values)');
        await printWithDelay('You nod as if you understand.');
        await experiment();
    } else if (choice === 'B') {
        await printWithDelay("\nBohr scoffs: Busy? Of course I am! When you try to explain something with no explanation, there is no time to waste.");
        await printWithDelay("Bohr: I’m trying to explain why atoms emit light in specific colors. Rutherford’s model lacked that, so I must find a reason.");
        await printWithDelay('He points at a machine full of glowing gas tubes.');
        await printWithDelay('Bohr: Watch closely.');
        await experiment();
    } else if (choice === 'C') {
        await printWithDelay('\nBohr’s eyes widen and he laughs: The one and only! I didn’t expect myself to be so…well…popular?');
        await printWithDelay('Bohr: Nevermind that. Let’s focus on atoms!');
        await experiment();
    } else {
        await printWithDelay('\nInvalid choice. Try again.');
        await bohr();
    }
}

// Bohr’s Experiment
async function experiment() {
    await printWithDelay('\nBohr hands you a glass tube labeled hydrogen connected to a power source.');
    await printWithDelay('Bohr: Watch as I pass an electric current through the glass.');
    await printWithDelay('The atoms emit bright red, blue, and violet lines on the spectrum.');
    await printWithDelay('Bohr: Each color is an electron jumping between energy levels in an atom.');

    await printWithDelay('\nWhat would you like to ask?');
    await printWithDelay('Choice 1: Ask about the energy levels.');
    await printWithDelay('Choice 2: Ask why only certain colors appear.');
    await printWithDelay('Choice 3: Ask what happens when electrons jump.');
    let choice = (await ask('Enter choice (1/2/3): ')).trim();

    if (choice === '1') {
        await printWithDelay('\nBohr picks up chalk and draws concentric circles.');
        await printWithDelay('Bohr: Electrons orbit the nucleus in fixed energy levels or shells. They can move between levels by absorbing or releasing specific energy.');
        await printWithDelay('Bohr: There are no in-betweens! That is the beauty of quantization.');
        await printWithDelay('(Quantization - a physical property exists in discrete units rather than a continuous range.)');
        await printWithDelay('Fun Fact: Bohr’s model first successfully explained hydrogen spectral lines!');
        await experimentChoice2or3();
    } else if (choice === '2') {
        await printWithDelay('\nBohr points to the glowing hydrogen tube.');
        await printWithDelay('Bohr: Each color corresponds to a specific energy release when an electron falls to a lower level.');
        await printWithDelay('Red = small energy jump, violet = bigger jump.');
        await printWithDelay('Bohr: Every element has its own spectral pattern, like a barcode. Astronomers use this to study distant stars.');
        await experimentChoice2or3();
    } else if (choice === '3') {
        await printWithDelay("\nBohr starts jumping around the lab (Safety precaution! Don't follow!).");
        await printWithDelay('Bohr: This is my favorite part! When an electron jumps to a higher energy level, it absorbs energy. Falling to a lower level emits a photon of light!');
        await printWithDelay('Bohr: Each burst of color is a photon escaping. Each element has a unique color spectrum.');
        await experimentChoiceStory();
    } else {
        await printWithDelay('\nInvalid choice. Try again.');
        await experiment();
    }
}

async function experimentChoice2or3() {
    await printWithDelay('\nDo you want to go back to the experiment or continue?');
    await printWithDelay('Choice: experiment / next');
    let choice = (await ask('Enter choice: ')).trim().toLowerCase();

    if (choice === 'experiment') await experiment();
    else await bohrStory();
}

async function experimentChoiceStory() {
    await printWithDelay('\nDo you want to go back to the experiment or continue with Bohr\'s story?');
    await printWithDelay('Choice: experiment / story');
    let choice = (await ask('Enter choice: ')).trim().toLowerCase();

    if (choice === 'experiment') await experiment();
    else await bohrStory();
}

async function bohrStory() {
    await printWithDelay('\nBohr cleans the board: I have a class to teach later.');
    await printWithDelay('You: Professor Bohr, may I know your story?');
    await printWithDelay('Bohr: Me? Why not! I guess I am a pretty interesting person…');
    await printWithDelay('Bohr: My atomic theory was just the beginning. After publishing in 1913, I continued studying atomic structure and quantum theory.');
    await printWithDelay('By 1922, I was awarded the Nobel Prize in Physics.');
    await printWithDelay('Later in Copenhagen, I built the Institute of Theoretical Physics, hosting Heisenberg and Schrödinger.');
    await printWithDelay('During the war, I fled to Sweden in 1943, then advised on the Manhattan Project, which I firmly rejected.');
    await printWithDelay('I later advocated for an open world of scientific research, enabling rapid advancements.');
    await printWithDelay('Now, I teach molecular biology, which I\'ve been curious about.');
    await printWithDelay('While my story is finished…the atomic story continues. There may still be improvements to my model.');
    await printWithDelay('Bohr: Everything we call real is made of things that cannot be regarded as real…');

    await quantum();
}

// SCENE 5: ERWIN, DE BROGLIE, HEISENBERG AND THE QUANTUM MODEL
async function quantum() {
    await printWithDelay('\nScene 5: The Quantum Era');
    await printWithDelay("You feel the space solidifying around you, less dizzy—perhaps you're getting the hang of time traveling now?");
    await printWithDelay('A voice greets you: “Welcome, I have been expecting you.”');
    await printWithDelay('You turn around to see Erwin Schrödinger. He doesn’t seem to want to explain himself.');

    await printWithDelay('\nWhat would you like to ask him?');
    await printWithDelay('Choice A: Ask where you are');
    await printWithDelay('Choice B: Ask about the cat');
    await printWithDelay('Choice C: Ask what he’s working on');
    let choice = (await ask('Enter choice (A/B/C): ')).trim().toUpperCase();

    if (choice === 'A') {
        await printWithDelay('\nSchrödinger: You are in Vienna, though, in a sense, nowhere and everywhere at once. We’re studying the behavior of electrons.');
        await printWithDelay('Schrödinger: Bohr’s orbits were neat, but nature… is not so tidy.');
        await printWithDelay('Schrödinger smiles: The atom is not like a solar system but rather a wave.');
    } else if (choice === 'B') {
        await printWithDelay('\nSchrödinger points at a random box.');
        await printWithDelay('Schrödinger: You see the box? Imagine a cat inside with a device that has a 50% chance of killing it, triggered by a single radioactive atom—a random quantum event.');
        await printWithDelay('Schrödinger: According to quantum theory, the atom is in superposition: decayed and undecayed until observed.');
        await printWithDelay('Schrödinger: Thus the cat is also in superposition: both dead and alive. To know, you must open the box.');
        await printWithDelay('He chuckles: Granted, this is just a thought experiment showing quantum mechanics\' strangeness.');
    } else if (choice === 'C') {
        await printWithDelay('\nSchrödinger: I am working on a quantum mechanical model, developing a wave equation describing electrons as waves rather than fixed orbits.');
        await printWithDelay('He picks up chalk and writes: This equation describes how the quantum state changes over time using a wave function.');
        await printWithDelay('Key components: wave function, Hamiltonian operator, time derivative, imaginary unit, Planck’s constant.');
    } else {
        await printWithDelay('\nInvalid choice. Try again.');
        await quantum();
        return;
    }

    // de Broglie
    await printWithDelay('\nAs Schrödinger works, a young man is blocked by a mountain of papers.');
    await printWithDelay('de Broglie: I knew I’d find you here! Look at all these papers on wave-particle duality.');
    await printWithDelay('He notices you: My name is Louis de Broglie, pleased to meet another fellow scientist.');

    await printWithDelay('\nWhat would you ask him about?');
    await printWithDelay('Choice D: Ask about wave-particle duality');
    await printWithDelay('Choice E: Ask if everything has a wavelength');
    let choice2 = (await ask('Enter choice (D/E): ')).trim().toUpperCase();

    if (choice2 === 'D') {
        await printWithDelay('\nde Broglie: Until now, light was both wave and particle. Why stop there? I proposed matter and electrons behave the same way.');
        await printWithDelay('de Broglie: Everything that moves has a wavelength. Even you, though too tiny to notice.');
        await printWithDelay('Schrödinger nods approvingly: Your idea inspired my equation. Without your waves, there would be no quantum mechanics.');
    } else if (choice2 === 'E') {
        await printWithDelay('\nde Broglie: Indeed! Anything that moves—electron, ball, even a person—has wave nature. For larger things, wavelength is tiny.');
        await printWithDelay('He chuckles: So don’t worry, you won’t diffract through a door.');
        await printWithDelay('(Diffraction: bending/spreading of waves around an obstacle.)');
    } else {
        await printWithDelay('\nInvalid choice. Try again.');
        await quantum();
        return;
    }

    // Heisenberg
    await printWithDelay('\nA haughty voice calls: Waves and cats again, Schrödinger? You’re forgetting about uncertainty!');
    await printWithDelay('Heisenberg: I am Werner Heisenberg. No matter how perfect your equation, you can’t know everything. There is always uncertainty.');
    await printWithDelay('He walks up to Schrödinger’s equation and writes: The more precise a particle\'s position, the less you know about momentum, and vice versa.');

    await printWithDelay('\nWhat would you like to do?');
    await printWithDelay('Choice F: Ask why we can’t know both');
    await printWithDelay('Choice G: Argue that science should find certainty');
    let choice3 = (await ask('Enter choice (F/G): ')).trim().toUpperCase();

    if (choice3 === 'F') {
        await printWithDelay('\nHeisenberg: Because observing changes a system. Shining light to see an electron knocks it somewhere else!');
        await printWithDelay('Heisenberg: It’s not that nature hides the truth, the truth itself is blurred at the smallest scale.');
    } else if (choice3 === 'G') {
        await printWithDelay('\nHeisenberg: Then you’re like Newton and Bohr. But the quantum world does not follow logic. It is always on the edge of possibility.');
        await printWithDelay('Schrödinger: And from uncertainty arises the pattern of everything.');
    } else {
        await printWithDelay('\nInvalid choice. Try again.');
        await quantum();
        return;
    }

    await printWithDelay('\nThe room glows brighter, chalkboards blur, filled with quantum equations. Time seems to ripple.');
    await printWithDelay('Schrödinger: You’ve witnessed the atom’s final form: a realm of waves and uncertainty.');
    await printWithDelay('de Broglie: Matter and energy are one.');
    await printWithDelay('Heisenberg: Knowledge has limits.');
    await printWithDelay('All: Farewell!');
    await endingScene();
}

async function endingScene() {
    await printWithDelay('\nScene 6: The Legacy of the Atom');
    await printWithDelay('(You land softly on what seems like a shimmering floor of light. The void around you hums with the voices of the great minds you\'ve met.)');
    await printWithDelay('Each scientist you met stands before you, glowing faintly in the ethereal light of scientific glory… and caffeine.');

    await printWithDelay('\nJohn Dalton: “All matter consists of tiny, indivisible particles called atoms.”');
    await printWithDelay('J.J. Thomson: “To find an electron is like discovering a new planet!”');
    await printWithDelay('Ernest Rutherford: “All science is either physics or stamp collecting.”');
    await printWithDelay('Niels Bohr: “Everything we call real is made of things that cannot be regarded as real.”');
    await printWithDelay('Erwin Schrödinger: “I don’t like it, and I’m sorry I ever had anything to do with it.”');
    await printWithDelay('Werner Heisenberg: “The more precisely you measure something, the less precisely you know anything at all.”');
    await printWithDelay('Louis de Broglie: “Matter and energy are two sides of the same coin… preferably a shiny one.”');

    await printWithDelay('\nYou realize each of them holds a key piece to the puzzle of the atom.');
    await printWithDelay('Dalton gave atoms existence, Thomson gave them electrons, Rutherford gave them a nucleus,');
    await printWithDelay('Bohr gave them orbits, and Schrödinger, Heisenberg, and de Broglie gave them chaos, waves, and quantum migraines.');
    await printWithDelay('\nA godly voice (probably the narrator T_T ): “Whose scientific chaos would you like to dive deeper into?”');

    await printWithDelay('\nChoices:');
    await printWithDelay('1. John Dalton');
    await printWithDelay('2. J.J. Thomson');
    await printWithDelay('3. Ernest Rutherford');
    await printWithDelay('4. Niels Bohr');
    await printWithDelay('5. Erwin Schrödinger');
    await printWithDelay('6. Werner Heisenberg');
    await printWithDelay('7. Louis de Broglie');

    let choice = parseInt((await ask('\nEnter your choice (1-7): ')).trim(), 10);

    if (choice === 1) {
        await printWithDelay('\n John Dalton (1766–1844)');
        await printWithDelay('Theory: Every element is made of tiny, indivisible particles called atoms, like billiard balls that stick together.');
        await printWithDelay('Equation (in spirit): Element = identical atoms → compound = different atoms combined in ratios.');
        await printWithDelay('Ridiculous Fact: Dalton was *so* dedicated that he kept a color blindness journal for 26 years… just to prove he saw red as green.');
        await printWithDelay('Fun Fact: He once tried to measure how gases mix using a homemade barometer that exploded in his face. He survived, thankfully—so science could live on.');
    } else if (choice === 2) {
        await printWithDelay('\n J.J. Thomson (1856–1940)');
        await printWithDelay('Theory: Atoms aren’t indivisible—they’re like plum pudding! The electrons are the raisins and the positive charge is the pudding.');
        await printWithDelay('Equation (vibes only): Atom = positively charged goo + scattered electrons (raisins).');
        await printWithDelay('Ridiculous Fact: He accidentally invented a vacuum cleaner prototype while trying to study cathode rays.');
        await printWithDelay('Fun Fact: He loved desserts so much, historians still argue whether his ‘plum pudding model’ was inspired by science or snack time.');
    } else if (choice === 3) {
        await printWithDelay('\n Ernest Rutherford (1871–1937)');
        await printWithDelay('Theory: The atom is mostly empty space with a dense nucleus in the center.');
        await printWithDelay('Equation: α-particles + gold foil → most pass through, few bounce back = NUCLEUS!');
        await printWithDelay('Ridiculous Fact: Rutherford once bombarded nitrogen gas and created the first artificial nuclear reaction… and didn’t even realize it until later lunch.');
        await printWithDelay('Fun Fact: He called his assistants ‘alpha scatterers,’ which sounds more like a 1920s rock band than scientists.');
    } else if (choice === 4) {
        await printWithDelay('\n Niels Bohr (1885–1962)');
        await printWithDelay('Theory: Electrons orbit the nucleus in fixed energy levels. They can jump between levels when they absorb or emit energy.');
        await printWithDelay('Equation: E = hf (energy equals frequency times Planck’s constant).');
        await printWithDelay('Ridiculous Fact: Bohr had his house plumbed with a beer tap connected directly to the Carlsberg Brewery next door. Yes, really.');
        await printWithDelay('Fun Fact: He used soccer analogies to explain atomic structure, which somehow made sense to everyone… and won him a Nobel Prize in 1922.');
    } else if (choice === 5) {
        await printWithDelay('\n Erwin Schrödinger (1887–1961)');
        await printWithDelay('Theory: Atoms behave like waves, and electrons exist in a cloud of probability described by his famous wave equation.');
        await printWithDelay('Equation: Ψ (wave function) = probability of finding an electron somewhere… maybe… who knows?');
        await printWithDelay('Ridiculous Fact: Schrödinger had a pet cat… which he probably never put in a box, but people keep asking anyway.');
        await printWithDelay('Fun Fact: He once went on a mountain vacation for a week, scribbled out his entire wave equation in a notebook, and changed physics forever.');
    } else if (choice === 6) {
        await printWithDelay('\n Werner Heisenberg (1901–1976)');
        await printWithDelay('Theory: You can’t precisely know both an electron’s position and momentum at the same time.');
        await printWithDelay('Equation: Δx * Δp ≥ ħ/2 (the more you know about one, the less you know about the other).');
        await printWithDelay('Ridiculous Fact: Heisenberg once got lost in the Alps and later claimed he discovered uncertainty while hiking in circles.');
        await printWithDelay('Fun Fact: He once accidentally built a sailboat backwards—and didn’t realize it until after launching it. Fitting, really.');
    } else if (choice === 7) {
        await printWithDelay('\n Louis de Broglie (1892–1987)');
        await printWithDelay('Theory: Particles like electrons behave like waves. Everything has a wavelength—even you!');
        await printWithDelay('Equation: λ = h / p (wavelength equals Planck’s constant divided by momentum).');
        await printWithDelay('Ridiculous Fact: De Broglie was actually a prince—literally. His full title was ‘Louis Victor Pierre Raymond, 7th Duc de Broglie.’');
        await printWithDelay('Fun Fact: He looked at light and said, ‘If light can act like a particle, maybe particles can act like light.’ Everyone thought he was crazy—until he was right.');
    } else {
        await printWithDelay('\nYou stand in silence, overwhelmed by centuries of brilliance and a few questionable snacks.');
    }

    await printWithDelay('\nThe scientists begin to fade, their voices lingering one last time—');
    await printWithDelay('Dalton whispers: “Everything starts small.”');
    await printWithDelay('Thomson: “Don’t underestimate dessert-based science.”');
    await printWithDelay('Rutherford: “Aim particles at gold and see what happens!”');
    await printWithDelay('Bohr: “Energy is quantized, and so is your curiosity.”');
    await printWithDelay('Schrödinger: “The cat is both grateful and not grateful for your visit.”');
    await printWithDelay('Heisenberg: “You were either here or you weren’t.”');
    await printWithDelay('de Broglie: “Wave goodbye!”');

    await printWithDelay('\n(You smile as the universe folds around you, carrying their words into the stars.)');
    await printWithDelay('From indivisible atoms to uncertain waves, your journey through the atom is complete.');
    await printWithDelay('\n The End ');
}

