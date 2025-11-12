document.addEventListener("DOMContentLoaded", () => {
    const introForm = document.getElementById("introForm");
    const formContainer = document.getElementById("form-container");
    const resultContainer = document.getElementById("result-container");
    const clearBtn = document.getElementById("clearBtn");
    const addCourseBtn = document.getElementById("add-course");
    const coursesContainer = document.getElementById("courses-container");

    async function buildIntroPage() {
        const formData = new FormData(introForm);
        
        const fName = formData.get("fName");
        const mName = formData.get("mName") || ""; 
        const nName = formData.get("nName") ? `(${formData.get("nName")})` : ""; 
        const lName = formData.get("lName");

        const mascotAdj = formData.get("mascotAdj");
        const mascotAnimal = formData.get("mascotAnimal");
        const divider = formData.get("divider");

        const imageCaption = formData.get("image_caption");
        const personalStatement = formData.get("personalStatement");

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
            bulletsHtml += `<li>${formData.get(`bullet${i}`)}</li>`;
        }

        let coursesHtml = "";
        const courseEntries = coursesContainer.querySelectorAll(".course-entry");
        
        courseEntries.forEach((entry) => {
            const inputs = entry.querySelectorAll("input");
            const dept = inputs[0].value;
            const num = inputs[1].value;
            const name = inputs[2].value;
            const reason = inputs[3].value;
            coursesHtml += `<li><strong>${dept} ${num} - ${name}:</strong> ${reason}</li>`;
        });

        const quote = formData.get("quote");
        const quoteAuthor = formData.get("quoteAuthor");

        const funnyThing = formData.get("funnyThing") || "N.A";
        const shareThing = formData.get("shareThing") || "N.A";

        let linksHtml = "";
        for (let i = 1; i <= 5; i++) {
            const url = formData.get(`link${i}`);
            let linkText = `Link ${i}`;
            try {
                linkText = new URL(url).hostname;
            } catch (error) { 
                
            }
            linksHtml += `<li><a href="${url}" target="_blank">${linkText}</a></li>`;
        }

        const ackStatement = formData.get("ackStatement");
        const ackDate = formData.get("ackDate");

        const resultHtml = `
            <h2>Introduction Form</h2> 
            
            <h3>${fName} ${mName} ${lName} ${nName} || ${mascotAdj} ${mascotAnimal}</h3>

            <figure>
                <img src="${finalImageUrl}" alt="${fName}'s Introduction Image" style="width:300px; border-radius: 8px;">
                <figcaption>${imageCaption}</figcaption>
            </figure>

            <ul>
                ${bulletsHtml}

                <li><strong>Courses:</strong>
                    <ul>
                        ${coursesHtml}
                    </ul>
                </li>
                
                <li><strong>Quote:</strong> "${quote}" - <em>${quoteAuthor}</em></li>
                
                <li><strong>Funny thing:</strong> ${funnyThing}</li>
                
                <li><strong>Something I would like to share:</strong> ${shareThing}</li>

                <li><strong>Links:</strong>
                    <ul>
                        ${linksHtml}
                    </ul>
                </li>
            </ul>

            <section>
                <h3>Acknowledgement</h3>
                <p>${ackStatement}</p>
                <p><em>Signed on: ${ackDate}</em></p>
            </section>

            <button type="button" id="reset-page">Reset Form</button>
        `;

        formContainer.style.display = "none"; 
        resultContainer.innerHTML = resultHtml; 
        resultContainer.style.display = "block"; 

        document.getElementById("reset-page").addEventListener("click", () => {
            resultContainer.style.display = "none"; 
            resultContainer.innerHTML = ""; 
            formContainer.style.display = "block"; 
            introForm.reset(); 
        });
    }

    introForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        
        if (!introForm.checkValidity()) {
            introForm.reportValidity();
            return;
        }
        
        buildIntroPage();
    });

    clearBtn.addEventListener("click", () => {
        introForm.querySelectorAll("input, textarea").forEach((input) => {
            if (input.type === 'file') {
                input.value = null; 
            } else if (input.type !== 'button' && input.type !== 'submit' && input.type !== 'reset') {
                input.value = ""; 
            }
        });
    });

    addCourseBtn.addEventListener("click", () => {
        const newCourseEntry = document.createElement("div");
        newCourseEntry.className = "course-entry";
        newCourseEntry.innerHTML = `
            <input type="text" name="course_dept" placeholder="Dept" required>
            <input type="text" name="course_num" placeholder="Num" required>
            <input type="text" name="course_name" placeholder="Name" required>
            <input type="text" name="course_reason" placeholder="Reason" required>
            <button type="button" class="delete-course">Delete</button>
        `;
        coursesContainer.appendChild(newCourseEntry);
    });

    coursesContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-course")) {
            e.target.parentElement.remove(); 
        }
    });
});