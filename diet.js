function suggestDiet() {
    let goal = document.getElementById("goal").value;
    let result = document.getElementById("result");
    let dietPlan = "";

    if (goal === "weight_loss") {
        dietPlan = "🥗 Eat: Green vegetables, fruits, oats, brown rice, nuts.";
    } else if (goal === "muscle_gain") {
        dietPlan = "💪 Eat: Lean protein (chicken, fish), eggs, dairy, nuts, peanut butter.";
    } else if (goal === "balanced_diet") {
        dietPlan = "🍏 Eat: Fresh fruits, vegetables, whole grains, nuts, dairy, and lean proteins.";
    }

    result.innerHTML = `<strong>Recommended Diet:</strong> <br> ${dietPlan}`;
}