const form = document.getElementById("form_sentence");
if(form) {
    form.onsubmit = async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        
        let sentence = formData.get("sentence");
        if (sentence.length <= 8) {
            alertMessage("error", "Please Input at least 8 character!");

            return;
        }

        const response = await window.axios.openAI(formData.get("sentence"));
        document.getElementById("ingredients").innerHTML = JSON.stringify(response.choices[0].text).replace(/\\n/g, '');
    };
} 

function alertMessage(status, sentence){
    window.Toastify.showToast({
        text: sentence,
        duration: 5000,
        stopOnFocus: true,
        style: {
            textAllign: "center",
            background: status == "error" ? "red":"green",
        color: "white",
        padding: "5px",
        marginTop: "2px"
        }
    });
}