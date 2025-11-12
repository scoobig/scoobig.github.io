document.addEventListener("DOMContentLoaded", () => {
    const introForm = document.getElementById("introForm");
    const generateJsonBtn = document.getElementById("generateJsonBtn");
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result-container");
    const pageTitle = document.getElementById("page-title");
    const coursesContainer = document.getElementById("courses-container");

    function generateJsonOutput() {
        const formData = new FormData(introForm);

        const coursesArray = [];
        const courseEntries = coursesContainer.querySelectorAll(".course-entry");
        courseEntries.forEach((entry) => {
            const inputs = entry.querySelectorAll("input");
            coursesArray.push({
                department: inputs[0].value,
                number: inputs[1].value,
                name: inputs[2].value,
                reason: inputs[3].value
            });
        });

        const linksArray = [];
        const linkNames = ["GitHub", "GitHub Page", "freeCodeCamp", "Codecademy", "LinkedIn"];
        for (let i = 1; i <= 5; i++) {
            linksArray.push({
                name: linkNames[i - 1],
                href: formData.get(`link${i}`)
            });
        }

        const jsonData = {
            firstName: formData.get("fName"),
            preferredName: formData.get("nName") || "",
            middleInitial: formData.get("mName") || "",
            lastName: formData.get("lName"),
            divider: formData.get("divider"),
            mascotAdjective: formData.get("mascotAdj"),
            mascotAnimal: formData.get("mascotAnimal"),
            image: formData.get("image_url"),
            imageCaption: formData.get("image_caption"),
            personalStatement: formData.get("personalStatement"),
            personalBackground: formData.get("bullet1"),
            professionalBackground: formData.get("bullet2"),
            academicBackground: formData.get("bullet3"),
            subjectBackground: formData.get("bullet4"),
            primaryComputer: formData.get("bullet5"),
            courses: coursesArray,
            links: linksArray
        };

        const finalJsonString = JSON.stringify(jsonData, null, 2);

        formContainer.style.display = "none";
        pageTitle.textContent = "Introduction JSON";

        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-json';
        
        code.textContent = finalJsonString;

        const resetButton = document.createElement('button');
        resetButton.type = 'button';
        resetButton.id = 'reset-page';
        resetButton.textContent = 'Reset Form';

        resetButton.addEventListener("click", () => {
            resultContainer.style.display = "none";
            resultContainer.innerHTML = "";
            formContainer.style.display = "block";
            pageTitle.textContent = "Introduction Form";
            introForm.reset();
        });

        pre.appendChild(code);
        resultContainer.innerHTML = '';
        resultContainer.appendChild(pre);
        resultContainer.appendChild(resetButton);
        resultContainer.style.display = "block";

        hljs.highlightElement(code);
    }

    generateJsonBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        
        if (!introForm.checkValidity()) {
            introForm.reportValidity();
            return;
        }
        
        generateJsonOutput();
    });
});