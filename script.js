function animateElements() {
    // Define the animation timeline
    const tl = gsap.timeline();
    gsap.set("#userInput, #result", { y: 100, opacity: 0 });
    gsap.to("#userInput,#result",
    {opacity:1,y:0}
    )
   
   
 }

document.addEventListener("DOMContentLoaded", function() {
    // Your code here
       animateElements();

          const arrow = document.querySelector('.arrow');
          const rotateButton = document.querySelector('.btn-success');
          const clear =document.querySelector(".btn-info")
          // const weightinput=document.getElementById("weight")
          // const heightinput=document.getElementById("height")
          const bmi_state = document.getElementById("bmi")
          const error = document.querySelector(".error")
          const bmi_value = document.querySelector(".result-value-state .bmi")
          const ideal_body_value = document.querySelector(".result-value-state .idealbody")
          const bodyimg = document.querySelector(".body-img")
          const body_result = document.querySelector(".body-result")
          const result = document.querySelector(".result")
          const user_input = document.querySelector(".user-input")
          const bmi_div = document.querySelector(".result-value-state .bmi-div")
          const ideal_div = document.querySelector(".result-value-state .ideal-div")

          body_result.style.display="none"
          bmi_state.innerHTML=""
          bmi_value.innerHTML=``
          body_list = document.querySelector(".body-instruction")
          const body_current_stat = document.querySelector('.result .body-current-stat')
          body_current_stat.style.display="none"
          const points = [
            [
              "Consult a healthcare professional for guidance.",
              "Increase calorie intake with nutrient-rich foods.",
              "Add strength training exercises to build muscle.",
              "Prioritize regular, moderate exercise for overall health.",
              "Monitor your progress."
            ],
            [
              "Maintain a balanced diet with diverse foods.",
              "Keep up with regular physical activity.",
              "Be mindful of portion sizes to prevent overeating.",
              "Ensure you stay well-hydrated.",
              "Aim for sufficient and quality sleep."
            ],
            [
              "Control portion sizes and reduce calorie intake.",
              "Opt for whole, unprocessed foods whenever possible.",
              "Engage in consistent aerobic exercises like walking or cycling.",
              "Keep track of your progress and make adjustments as needed.",
              "Stay motivated and patient."
            ],
            [
              "Seek professional guidance for a tailored weight management plan.",
              "Practice mindful eating to manage portions.",
              "Incorporate both aerobic and strength training exercises.",
              "Set achievable goals and monitor your journey.",
              "Consider seeking emotional support as well."
            ],
            [
              "Consult a healthcare provider to explore comprehensive options.",
              "Consider medical interventions or surgeries as recommended.",
              "Adhere to a structured diet regimen.",
              "Commit to regular physical activity, possibly with a fitness expert.",
              "Prioritize mental and emotional well-being with counseling or support."
            ]
          ];
          

         
        
          
          rotateButton.addEventListener('click', () => {
            
             body_list.innerHTML=""
  
              const age = document.getElementById('age').value;
              const genderInputs = document.querySelectorAll('input[name="gender"]');
              let height = document.getElementById('height').value;
              let weight = document.getElementById('weight').value;
              const total_energy_tag = document.querySelector('.result .body-current-stat .total-energy')
              const carbohydate_tag = document.querySelector('.result .body-current-stat .carbohydrate')
              const protein_tag = document.querySelector('.result .body-current-stat .protein')
              const fat_tag = document.querySelector('.result .body-current-stat .fat')
              const initialX1 = -window.innerWidth;
              const initialX2 = window.innerWidth;

              // console.log(weightInput,heightInput);
  
              
              // Loop through radio buttons to find the selected one
              let genderSelected = '';
               genderInputs.forEach(radio => {
              if (radio.checked) {
                  genderSelected = radio.value;
              }
              });
  
          // Check if all conditions are met
          if (age >= 2 && age <= 120 &&
              genderSelected !='' &&
              height > 0 &&
              weight > 0) 
  
              {
            
  
              error.style.display="none"
              const heightinm = height/100
              const bmi = (weight/(heightinm*heightinm)).toFixed(2);
              

        // TweenMax animation
             gsap.from(bmi_div, { duration: 1, x: initialX1, ease: "power2.out" });
       
              bmi_value.innerHTML=`BMI = ${bmi} kg/m2`

              const rotatedeg = ((bmi - 13) / (40 - 10) * 180)
              
              const idealbody=(height-152)/2.5
              let bmr;
              let idealbodyweight;
              if (genderSelected=='male'){
                 idealbodyweight = (106+(6*idealbody))/2.2
                 bmr = 655+ (9.5* weight) + (1.8* height)-(4.6*age)
               

              }
                if (genderSelected=='female'){
                  idealbodyweight = (100+(5*idealbody))/2.2
                  bmr = 66.5+ (13.7* weight) + (5* height)-(6.76*age)

               
                }
                gsap.from(ideal_div, { duration: 1, x: initialX2, ease: "power2.out" });
                ideal_body_value.innerHTML=`Ideal body weight = ${idealbodyweight.toFixed(2)} kg`
                const totalenery=(bmr*1.375)
                const carbohydrate =(((65/100)*totalenery)/4)
                const protein = ((((1*idealbodyweight)*4)/totalenery)*100)
                const fat =((((100-(65+protein))/100)*totalenery)/9)
               
                console.log(totalenery,carbohydrate,protein,fat);
                carbohydate_tag.innerHTML=carbohydrate.toFixed(2);
                total_energy_tag.innerHTML = totalenery.toFixed(2);
                protein_tag.innerHTML = protein.toFixed(2);
                fat_tag.innerHTML = fat.toFixed(2);
                body_current_stat.style.display="grid"

                gsap.fromTo(".body-current-stat h4", {
                  scale: -1, // Start from -1 scale
                  opacity: 0, // Start with opacity 0 (hidden)
              }, {
                  scale: 1, // End at 1 scale
                  opacity: 1, // Show the element
                  duration: 1, // Animation duration in seconds
                  stagger: 1, // Time delay between animations (1 second)
                  onComplete: function () {
                      // Animation complete
                  }
              });
              
              if (rotatedeg<185){
                  arrow.style.transform = `rotate(${rotatedeg}deg)`;
  
  
              }else{
                  arrow.style.transform = `rotate(${185}deg)`;
  
              }
              if (bmi<16){
                  bmi_state.style.color="red"
                  bmi_state.innerHTML="(Severe Thinness)"
                  bodyimg.src="body/original/body5.png"
                  points[0].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })
  
              }
              else if(bmi<17){
                bmi_state.style.color="#e06969"
                  bmi_state.innerHTML="(Moderate Thinness)"
                  bodyimg.src="body/original/body5.png"
                  points[0].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })
  
              }
              else if(bmi<18.5){
                bmi_state.style.color="#bfc219"
                bmi_state.innerHTML="(Mild Thinness)"
                bodyimg.src="body/original/body5.png"
                points[0].forEach((value,index)=>{
                  const newItem = document.createElement("li");

                  newItem.textContent = value;
                  body_list.appendChild(newItem);


                })

  
              }
              else if(bmi<25){
                bmi_state.style.color="#67c920"

                  bmi_state.innerHTML="(Normal)"
                  bodyimg.src="body/original/body4.png"
                  points[1].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })

  
              }
              else if(bmi<30){
                bmi_state.style.color="#bfc219"

                  bmi_state.innerHTML="(Overweight)"
                  bodyimg.src="body/original/body3.png"
                  points[2].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })
  
              }
              else if(bmi<35){
                  bmi_state.style.color="#ed4a4a"

                  bmi_state.innerHTML="(Obese Class I)"
                  bodyimg.src="body/original/body2.png"
                  points[3].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })
  
  
              }
              else if(bmi<40){
                bmi_state.style.color="#c73030"

                  bmi_state.innerHTML="(Obese Class II)"
                  bodyimg.src="body/original/body1.png"
                  points[4].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })
  
              }
              else{
                bmi_state.style.color="red"
                  
                  bmi_state.innerHTML="(Obese Class III)"
                  bodyimg.src="body/original/body1.png"
                  points[4].forEach((value,index)=>{
                    const newItem = document.createElement("li");

                    newItem.textContent = value;
                    body_list.appendChild(newItem);


                  })
              }
              body_result.style.display="flex"
  
          } else {
              error.style.display="block"
              body_result.style.display="none"
              points[4].forEach((value,index)=>{
                const newItem = document.createElement("li");

                newItem.textContent = value;
                body_list.appendChild(newItem);


              })
  
          }
          
              
  
              
  
               
              
  
          });
          clear.addEventListener('click', () => {
              const form = document.querySelector('form');
  
          // Reset the form to clear all inputs and radio buttons
            //  form.reset();
              arrow.style.transform = `rotate(-7deg)`;
              bmi_value.innerHTML=``
  
              bmi_state.innerHTML=""
            //   body_result.style.display="none"
  
  
  
          });
      });