window.onload = function() {
    // Particles ანიმაცია
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80 },
            "color": { "value": "#00ff88" },
            "line_linked": { "enable": true, "distance": 150, "color": "#00ff88", "opacity": 0.2 },
            "move": { "enable": true, "speed": 1.5 }
        }
    });

    let players = [];
    let currentPlayerIndex = 0;
    const roles = ["მანიპულატორი", "მოღალატე", "ერთგული", "შპიონი", "დიპლომატი", "ქურდი"];

    window.playSound = function(id) {
        const sound = document.getElementById(id);
        if (sound) { sound.currentTime = 0; sound.play().catch(() => {}); }
    };

    window.showScreen = function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    };

    window.createRoom = function() {
        playSound('clickSound');
        showScreen('lobby-screen');
    };

    window.addNewPlayer = function() {
        const input = document.getElementById('new-player-name');
        const name = input.value.trim();
        if (!name) return alert("ჩაწერე სახელი!");
        
        players.push({
            name: name,
            points: 10,
            role: roles[Math.floor(Math.random() * roles.length)],
            choice: null
        });
        
        input.value = "";
        updateList();
        playSound('clickSound');
        if (players.length >= 2) document.getElementById('start-game-btn').style.display = "block";
    };

    function updateList() {
        document.getElementById('player-list').innerHTML = players.map(p => `<span class="player-tag">👤 ${p.name}</span>`).join("");
    }

    window.startOfflineGame = function() {
        currentPlayerIndex = 0;
        showPassScreen();
        showScreen('game-screen');
    };

    function showPassScreen() {
        document.getElementById('pass-device-screen').style.display = "block";
        document.getElementById('role-reveal-screen').style.display = "none";
        document.getElementById('next-player-instruction').innerHTML = `გადაეცი ტელეფონი: <span>${players[currentPlayerIndex].name}</span>`;
    }

    window.showSecretRole = function() {
        playSound('clickSound');
        document.getElementById('pass-device-screen').style.display = "none";
        document.getElementById('role-reveal-screen').style.display = "block";
        document.getElementById('current-player-role').innerText = players[currentPlayerIndex].role;
        document.getElementById('my-points').innerText = players[currentPlayerIndex].points;
    };

    window.makeDecision = function(type) {
        players[currentPlayerIndex].choice = type;
        if(type === 'trust') playSound('trustSound'); else playSound('betraySound');

        currentPlayerIndex++;
        if (currentPlayerIndex < players.length) {
            showPassScreen();
        } else {
            finishRound();
        }
    };

    function finishRound() {
        let results = "რაუნდი დასრულდა! შედეგები:\n\n";
        
        // ქულების დათვლა წყვილებში
        for (let i = 0; i < players.length; i += 2) {
            if (i + 1 < players.length) {
                let p1 = players[i];
                let p2 = players[i+1];
                
                if (p1.choice === 'trust' && p2.choice === 'trust') {
                    p1.points += 3; p2.points += 3;
                    results += `🤝 ${p1.name} & ${p2.name}: ორივე ენდო (+3)`;
                } else if (p1.choice === 'trust' && p2.choice === 'betray') {
                    p1.points -= 2; p2.points += 5;
                    results += `😈 ${p2.name}-მა უღალატა ${p1.name}-ს! (+5 / -2)`;
                } else if (p1.choice === 'betray' && p2.choice === 'trust') {
                    p1.points += 5; p2.points -= 2;
                    results += `😈 ${p1.name}-მა უღალატა ${p2.name}-ს! (+5 / -2)`;
                } else {
                    p1.points -= 1; p2.points -= 1;
                    results += `⚔️ ${p1.name} & ${p2.name}: ორივემ უღალატა (-1)`;
                }
                results += "\n";
            }
        }
        
        alert(results);
        if(confirm("გსურთ შემდეგი რაუნდი?")) {
            currentPlayerIndex = 0;
            showPassScreen();
        } else {
            location.reload();
        }
    }
};
