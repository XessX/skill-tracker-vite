import ProjectCard from "../components/ProjectCard";
import { Title, Meta } from 'react-head';

function Projects() {
  const projects = [
    {
      title: "3D Hand Shape Reconstruction from 2D hand Video dataset",
      tech: "Python, PyTorch, MediaPipe, LLM",
      desc: "Reconstructed 3D hand shape from 2D videos using deep learning and machine learning pipelines.",
      liveLink: "https://macsphere.mcmaster.ca/handle/11375/30207",
      codeLink: null
    },
    {
      title: "Income Prediction ML App",
      tech: "Python, Random Forest, XGBoost, Sklearn",
      desc: "Income classification using ML models with full EDA and visualizations.",
      codeLink: "https://github.com/XessX/Comprehensive-Data-Analysis-and-Model-Development-for-Income-Prediction-Using-Random-Forest"
    },
    {
      title: "Titanic Survival Predictor",
      tech: "Python, Pandas, Logistic Regression, Random Forest, Sklearn",
      desc: "ML model to predict survival on Titanic dataset. It comes with many tests including training with random forest",
      codeLink: "https://github.com/XessX/Titanic_Survival_Prediction"
    },
    {
      title: "cnn_based_food_classification",
      tech: "Python, Pytorch, Pandas",
      desc: "Deep CNN to classify handwritten digits with high accuracy.",
      codeLink: "https://github.com/XessX/cnn_based_food_classification"
    },
    {
      title: "A Physics engine based on Angry Bird game",
      tech: "C++, SFML, Boost, Odeint, Cmake, CLion, catch2",
      desc: "A physics engine based on angry bird has been created from scracth using C++ for Mac grad Course. Having a full documentation of SRS, VnV and MG, MIS reports which followed V model",
      codeLink: "https://github.com/XessX/Angry_Bird_Alike"
    }
  ];

  return (
    <>
    <Title>Resume | Al Jubair Hossain</Title>
    <Meta name="description" content="Interactive resume of Al Jubair showcasing skills, experience, and more." />

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
        <h1 className="text-3xl font-bold text-center mb-8">📂 My Projects</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <ProjectCard key={i} {...proj} />
        ))}
      </div>

      <div className="text-center mt-10">
        <a
          href="/Al_Jubair_Hossain_Resume.pdf"
          download
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow-lg"
        >
          📄 Download My Resume
        </a>
      </div>
    </div>
    </>
  );
}

export default Projects;
