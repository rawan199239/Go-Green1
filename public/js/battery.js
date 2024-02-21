navigator.getBattery().then(function (battery) {
    updateBatteryStatus(battery);
    battery.addEventListener('levelchange', function () {
        updateBatteryStatus(battery);
    });
    battery.addEventListener('chargingchange', function () {
        updateBatteryStatus(battery);
    });
});

function updateBatteryStatus(battery) {
    var batteryFill = document.querySelector(".battery-fill");
    var batteryPercentage = document.querySelector(".battery-percentage");
    var batteryStatusText = document.querySelector(".battery-status-text");

    var fillWidth = Math.round(battery.level * 100) + "%";
    batteryFill.style.width = fillWidth;
    batteryPercentage.innerHTML = fillWidth;

    if (battery.charging) {
        batteryStatusText.innerHTML = 'Now is Charging';
    } else {
        batteryStatusText.innerHTML = "Not Charging";
    }
}