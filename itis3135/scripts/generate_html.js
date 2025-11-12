document.addEventListener("DOMContentLoaded", () => {
    const introForm = document.getElementById("introForm");
    const generateHtmlBtn = document.getElementById("generateHtmlBtn");
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result-container");
    const pageTitle = document.getElementById("page-title");
    const coursesContainer = document.getElementById("courses-container");

    async function generateHtmlOutput() {
        const formData = new FormData(introForm);
        
        const fName = formData.get("fName");
        const mName = formData.get("mName") || ""; 
        const nName = formData.get("nName") ? `(${formData.get("nName")})` : ""; 
        const lName = formData.get("lName");
        const mascotAdj = formData.get("mascotAdj");
        const mascotAnimal = formData.get("mascotAnimal");
        const imageCaption = formData.get("image_caption");
        const quote = formData.get("quote");
        const quoteAuthor = formData.get("quoteAuthor");
        const ackStatement = formData.get("ackStatement");
        const ackDate = formData.get("ackDate");
        const funnyThing = formData.get("funnyThing") || "N/A";
        const shareThing = formData.get("shareThing") || "N/A";

        const defaultImageUrl = formData.get("image_url");
        const uploadedImageFile = formData.get("image_upload");
        let finalImageUrl = defaultImageUrl; 

        if (uploadedImageFile && uploadedImageFile.size > 0) {
            finalImageUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(uploadedImageFile);
            });
        }
        
        let bulletsHtml = "";
        for (let i = 1; i <= 7; i++) {
            bulletsHtml += `    <li>${formData.get(`bullet${i}`)}</li>\n`;
        }

        let coursesHtml = "";
        const courseEntries = coursesContainer.querySelectorAll(".course-entry");
        courseEntries.forEach((entry) => {
            const inputs = entry.querySelectorAll("input");
            const dept = inputs[0].value;
            const num = inputs[1].value;
            const name = inputs[2].value;
            const reason = inputs[3].value;
            coursesHtml += `            <li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>\n`;
        });

        let linksHtml = "";
        for (let i = 1; i <= 5; i++) {
            const url = formData.get(`link${i}`);
            let linkText = `Link ${i}`;
            try {
                linkText = new URL(url).hostname;
            } catch (error) { /* intentionally empty */ }
            linksHtml += `            <li><a href="${url}" target="_blank">${linkText}</a></li>\n`;
        }

        const finalHtmlString = `<h2>Introduction HTML</h2>
<h3>${fName} ${mName} ${lName} ${nName} || ${mascotAdj} ${mascotAnimal}</h3>

<figure>
    <img
        src="${finalImageUrl}"
        alt="${fName}'s Introduction Image"
    />
    <figcaption>${imageCaption}</figcaption>
</figure>

<ul>
${bulletsHtml}
    <li><strong>Courses:</strong>
        <ul>
${coursesHtml}        </ul>
    </li>
    
    <li><strong>Quote:</strong> "${quote}" - <em>${quoteAuthor}</em></li>
    
    <li><strong>Funny thing:</strong> ${funnyThing}</li>
    
    <li><strong>Something I would like to share:</strong> ${shareThing}</li>

    <li><strong>Links:</strong>
        <ul>
${linksHtml}        </ul>
    </li>
</ul>

<section>
    <h3>Acknowledgement</h3>
    <p>${ackStatement}</p>
    <p><em>Signed on: ${ackDate}</em></p>
</section>
`;

        formContainer.style.display = "none";
        pageTitle.textContent = "Introduction HTML";

        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-html'; 
        
        code.textContent = finalHtmlString;

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

    generateHtmlBtn.addEventListener("click", (e) => {
        e.preventDefault(); 
        
        if (!introForm.checkValidity()) {
            introForm.reportValidity();
            return;
        }
        
        generateHtmlOutput();
    });
});