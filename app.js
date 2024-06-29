document.addEventListener('DOMContentLoaded', () => {
    const valueDisplay = document.getElementById('valueDisplay');
    const slider = document.querySelector('.slider-track');
    const sliderBar = slider.querySelector('.slider-bar');
    const sliderBall = slider.querySelector('.slider-ball');

    // Setting default base value
    let progressWidth = 33;
    slider.style.setProperty('--__barWidth', progressWidth + '%');

    let isDragging = false;

    // Event listeners for mouse interactions
    sliderBall.addEventListener('mousedown', startDragging);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDragging);

    // Event listeners for touch interactions
    sliderBall.addEventListener('touchstart', startDragging);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', stopDragging);

    function startDragging(e) {
        isDragging = true;
        if (e.type === 'touchstart') {
            e = e.touches[0];
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', stopDragging);
    }

    function onMouseMove(e) {
        if (isDragging) {
            const sliderRect = slider.getBoundingClientRect();
            let newWidth = e.clientX - sliderRect.left;

            // Clamp the value between 0 and the slider's width
            newWidth = Math.max(0, Math.min(newWidth, sliderRect.width));

            progressWidth = (newWidth / sliderRect.width) * 100;
            slider.style.setProperty('--__barWidth', progressWidth + '%');
            sliderBall.style.left = `calc(${progressWidth}% - 10px)`; // Adjusted to keep the ball centered

            // Update the displayed value
            valueDisplay.innerHTML = Math.round(progressWidth);
        }
    }

    function onTouchMove(e) {
        if (isDragging) {
            e.preventDefault();
            const touch = e.touches[0];
            const sliderRect = slider.getBoundingClientRect();
            let newWidth = touch.clientX - sliderRect.left;

            // Clamp the value between 0 and the slider's width
            newWidth = Math.max(0, Math.min(newWidth, sliderRect.width));

            progressWidth = (newWidth / sliderRect.width) * 100;
            slider.style.setProperty('--__barWidth', progressWidth + '%');
            sliderBall.style.left = `calc(${progressWidth}% - 10px)`; // Adjusted to keep the ball centered

            // Update the displayed value
            valueDisplay.innerHTML = Math.round(progressWidth);
        }
    }

    function stopDragging() {
        if (isDragging) {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', stopDragging);
        }
    }

    // Initialize the ball position based on the default progress width
    sliderBall.style.left = `calc(${progressWidth}% - 10px)`; // Adjusted to keep the ball centered
    valueDisplay.innerHTML = Math.round(progressWidth); // Initial value display
});
