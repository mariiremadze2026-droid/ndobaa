window.onload = function() {
    // ნაწილაკების ანიმაცია
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80 },
                "color": { "value": "#00ff88" },
                "line_linked": { "enable": true, "color": "#00ff88", "opacity": 0.1 },
                "move": { "enable": true, "speed": 1.5 }
            }
        });
    }

    // ხმების ფუნქციები (უსაფრთხო რეჟიმში)
    window.playSound = function(id) {
        const sound = document.getElementById(id);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log("აუდიოს გაშვება ვერ მოხერხდა: ", e));
        }
    };

    // ეკრანების გადართვა
    window.showScreen = function(id) {
        playSound('clickSound');
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(id);
        if (target) target.classList.add('active');
    };

    // ოთახის შექმნა
    window.createRoom = function() {
        const nameInput = document.getElementById('player-name');
        if(!nameInput || !nameInput.value) return alert("სახელი ჩაწერე!");
        
        const code = Math.random().toString(36).substring(2, 6).toUpperCase();
        document.getElementById('display-room-code').innerText = "#" + code;
        
        const list = document.getElementById('player-list');
        list.innerHTML = `<div>👤 ${nameInput.value} (შენ)</div>`;
        
        showScreen('lobby-screen');
    };

    window.startGame = function() {
        showScreen('game-screen');
    };

    window.makeDecision = function(type) {
        if(type === 'trust') {
            playSound('trustSound');
            alert("შენ ენდე მეგობარს!");
        } else {
            playSound('betraySound');
            alert("შენ უღალატე! 😈");
        }
    };
};
