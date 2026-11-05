
(() => {

    // ========================================
    // 1. Select HTML elements
    // ========================================

    const itemForm = document.querySelector("#item-form");
    const itemStatus = document.querySelector("#item-status");


    // ========================================
    // 2. Prepare Portfolio Items collection
    // ========================================

    if (!Array.isArray(window.portfolioItems)) {
        window.portfolioItems = [];
    }


    // ========================================
    // 3. Check required HTML elements
    // ========================================

    if (!itemForm || !itemStatus) {
        console.error("Portfolio Item form elements not found.");
        return;
    }


    // ========================================
    // 4. Generate a unique ID
    // ========================================

    function generateItemId() {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {
            return `item-${window.crypto.randomUUID()}`;
        }

        return `item-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 10)}`;
    }


    // ========================================
    // 5. Handle form submission
    // ========================================

    itemForm.addEventListener("submit", function (event) {

        // Prevent the browser from reloading the page.
        event.preventDefault();


        // ========================================
        // 6. Collect form data
        // ========================================

        const formData = new FormData(itemForm);

        function getValue(fieldName) {
            return String(formData.get(fieldName) ?? "").trim();
        }


        // ========================================
        // 7. Convert Skills into an Array
        // ========================================

        const skills = getValue("skills")
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");

        if (skills.length === 0) {
            itemStatus.textContent =
                "Please enter at least one skill.";

            itemStatus.className =
                "mt-3 mb-0 text-danger";

            return;
        }


        // ========================================
        // 8. Create Portfolio Item Object
        // ========================================

        const item = {

            id: generateItemId(),

            title: getValue("title"),

            type: getValue("type"),

            date: getValue("date"),

            role: getValue("role"),

            description: getValue("description"),

            skills: skills,

            reflection: {

                whatIDid: getValue("whatIDid"),

                whatILearned: getValue("whatILearned"),

                challenge: getValue("challenge"),

                nextStep: getValue("nextStep")

            },

            evidence: [
                getValue("evidence")
            ]

        };


        // ========================================
        // 9. Add Item to collection
        // ========================================

        window.portfolioItems.push(item);


        // ========================================
        // 10. Display success message
        // ========================================

        itemStatus.textContent =
            `"${item.title}" added successfully! ` +
            `Total items: ${window.portfolioItems.length}`;

        itemStatus.className =
            "mt-3 mb-0 text-success";


        // ========================================
        // 11. Log data for testing
        // ========================================

        console.log("New Portfolio Item:", item);

        console.log(
            "All Portfolio Items:",
            window.portfolioItems
        );

        console.log(
            "Portfolio Items JSON:",
            JSON.stringify(window.portfolioItems, null, 2)
        );


        // ========================================
        // 12. Reset form
        // ========================================

        itemForm.reset();

    });

})();
