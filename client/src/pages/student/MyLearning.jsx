import React from 'react'



function MyLearning() {
  
const courses=[]
  const loading=false;
  return (
    <div>
        {
          loading? (
            <LearningSkeleton/>
          ): (
  
    courses?.length >0 ?( <div>
    <h1>hello</h1>
    </div>): (<h1>You are not enrolled any courses till now</h1>)
  
          )
        }

    </div>
  )
}

export default MyLearning



const LearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
  );
};


