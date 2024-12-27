const canvas = document.getElementById("fireworks");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Particle {
            constructor(x, y, color, radius) {
                this.x = x;
                this.y = y;
                this.color = color;
                this.radius = radius;
                this.alpha = 1;
                this.velocityX = (Math.random() - 0.5) * 6;
                this.velocityY = (Math.random() - 0.5) * 6;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }

            update() {
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.alpha -= 0.01;
            }
        }

        const particles = [];

        function spawnFireworks() {
            const colors = ["#ff6347", "#ffa500", "#32cd32", "#1e90ff", "#ff69b4"];
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const color = colors[Math.floor(Math.random() * colors.length)];

            for (let i = 0; i < 50; i++) {
                particles.push(new Particle(x, y, color, Math.random() * 3 + 1));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                if (particle.alpha <= 0) {
                    particles.splice(index, 1);
                } else {
                    particle.update();
                    particle.draw();
                }
            });

            requestAnimationFrame(animate);
        }

        setInterval(spawnFireworks, 800);
        animate();

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Transition to 2025
        setTimeout(() => {
            const yearText = document.getElementById("year");
            yearText.textContent = "Welcome 2025!";
            yearText.style.animation = "fadeInScale 3s ease-in-out";
        }, 5000);