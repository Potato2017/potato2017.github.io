var farmer = function() {
    if (potatoes < prices[0]) return;
    potatoes -= prices[0]
    amt[0]++;
    prices[0]*=1.2;
}
var tractor = function() {
    if (potatoes < prices[1]) return;
    potatoes -= prices[1]
    amt[1]++;
    prices[1]*=1.2;
}
var farmmanager = function() {
    if (potatoes < prices[2]) return;
    potatoes -= prices[2]
    amt[2]++;
    prices[2]*=1.2;
}
var potatopeeler = function() {
    if (potatoes < prices[3]) return;
    potatoes -= prices[3]
    amt[3]++;
    prices[3]*=1.2;
}