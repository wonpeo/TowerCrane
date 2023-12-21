import axios from "axios"

export const jobSeekerSignInApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/auth/jobSeekerSignIn', data);
        return response.data;
    } catch(error){
        console.error(error);
        return null;
    }
};

export const jobOffererSignInApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/auth/jobOffererSignIn', data);
        return response.data;
    } catch(error){
        console.error(error);
        return null;
    }
};

export const jobSeekerSignUpApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/auth/jobSeekerSignUp', data);
        if(response.data.result === true) return true;
        else throw new Error(response.data.message);
    } catch(error){
        console.error(error);
        return false;
    }
};

export const jobOffererSignUpApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/auth/jobOffererSignUp', data);
        if(response.data.result === true) return true;
        else throw new Error(response.data.message);
    } catch(error){
        console.error(error);
        return false;
    }
};

export const JobOfferPostingsApi = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/jobOfferPostingList');
        if (response.data.result === true) {
            console.log(response.data);
            const formattedData = response.data.data.map((item:any) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName,
                joName: item.constructionSite.jobOfferer.joName,
                wagePaymentAbility:item.constructionSite.jobOfferer.wagePaymentAbility,	
                workEnvironment:item.constructionSite.jobOfferer.workEnvironment,	
                workIntensity:item.constructionSite.jobOfferer.workIntensity,	
                orderValidity :item.constructionSite.jobOfferer.orderValidity,
                constructionSiteId: item.constructionSite.constructionSiteId,
                closingDate: item.closingDate,
                booked: item.booked
            }));
            console.log(formattedData);
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const JobSeekPostingsApi = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/jobSeekPostingList');
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any, index:number) => ({
                id:item.jobSeekPostingId || index.toString(),
                offerWage:item.offerWage,
                jsJobClass: item.jobSeeker.jsJobClass,
                jsAge: item.jobSeeker.jsAge,
                jsCareer: item.jobSeeker.jsCareer,
                jsName: item.jobSeeker.jsName,
                jsId: item.jobSeeker.jsId,

                workAttitude: item.jobSeeker.workAttitude,
                jobPerformance: item.jobSeeker.jobPerformance,
                rehiredRate: item.jobSeeker.rehiredRate,
                attendanceRate: item.jobSeeker.attendanceRate,
                closingDate: item.closingDate,
                booked: item.booked
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const NewComerPostingsApi = async () => {
    try {
        const response = await axios.get('http://localhost:4000/api/jobOfferPostingListForNoob');
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName,
                joName: item.constructionSite.jobOfferer.joName,

                wagePaymentAbility:item.constructionSite.jobOfferer.wagePaymentAbility,	
                workEnvironment:item.constructionSite.jobOfferer.workEnvironment,	
                workIntensity:item.constructionSite.jobOfferer.workIntensity,	
                orderValidity :item.constructionSite.jobOfferer.orderValidity,
                closingDate: item.closingDate,
                booked: item.booked
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const MainPageApi = async (url: string) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/ListForMainPage${url}`);
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName,
                joName: item.constructionSite.jobOfferer.joName,
                wagePaymentAbility:item.constructionSite.jobOfferer.wagePaymentAbility,	
                workEnvironment:item.constructionSite.jobOfferer.workEnvironment,	
                workIntensity:item.constructionSite.jobOfferer.workIntensity,	
                orderValidity :item.constructionSite.jobOfferer.orderValidity,
                closingDate: item.closingDate,
                booked: item.booked
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const JobSeekerBusinessRecordApi = async (jsId: string) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/businessRecord/jobSeekerBusinessRecord`, {jsId});
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.contractId.toString(),
                companyName:item.constructionSite.jobOfferer.companyName,
                requirementJobClass:item.jobSeeker.jsJobClass,
                location:item.constructionSite.location,
                contractDate:item.contractDate,
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const JobOffererBusinessRecordApi = async (joId: string) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/businessRecord/jobOffererBusinessRecord`, { joId });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.contractId.toString(),
                name:item.jobSeeker.jsName,
                requirementJobClass:item.jobSeeker.jsJobClass,
                location:item.constructionSite.location,
                contractDate:item.contractDate,
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const deleteJobSeekPostingApi = async (jobSeekPostingId: string) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/deleteJobSeekPosting`, { jobSeekPostingId });
      if(response.status === 200){
        return true;
      } else {
        throw new Error('Failed to delete post');
      }
    } catch(e) {
      console.log(e);
      return false;
    }
  }
  
export const JobSeekPostingRecordApi = async (jsId: string) => {
    try {
        const response = await axios.post(`http://localhost:4000/api/jobSeekPostingRecord`, { jsId });
        if (response.data.result === true) {
        return response.data.data;
      } else {
        console.error(response.data.message);
        return null;
      }
    } catch(error){
      console.error(error);
      return null;
    }
  }

export const deleteJobOfferPostingApi = async (jobOfferPostingId: string) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/deleteJobOffererPosting`, { jobOfferPostingId });
      if(response.status === 200){
        return true;
      } else {
        throw new Error('Failed to delete post');
      }
    } catch(e) {
      console.log(e);
      return false;
    }
  }
  
export const JobOfferPostingRecordApi = async (joId: string) => {
    try {
      const response = await axios.post(`http://localhost:4000/api/jobOfferPostingRecord`, {joId});
      if (response.data.result === true) {
        return response.data.data;
      } else {
        console.error(response.data.message);
        return null;
      }
    } catch(error){
      console.error(error);
      return null;
    }
  }

export const JobOffererAssessmentApi = async (payload: any) => {
    try {
        const response = await axios.post("http://localhost:4000/api/Assessment/JobOffererAssessment", payload);
        return response.data;
    } catch(error){
        console.error(error);
        return null;
    }
};

export const JobSeekerAssessmentApi = async (payload: any) => {
    try {
        const response = await axios.post("http://localhost:4000/api/Assessment/JobSeekerAssessment", payload);
        return response.data;
    } catch(error){
        console.error(error);
        return null;
    }
}; 

export const JobSeekerChangingInfoApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/InfoChange/jobSeekerInfoChange', data);
        console.log(response.data); 

        if (response.data) {
            return {
                jsId: response.data.jsId,
                jsName: response.data.jsName,
                jsJobClass: response.data.jsJobClass,
                jsAge: response.data.jsAge,
                jsCareer: response.data.jsCareer
            };
        }
        else {
            console.error('No data in the server response.');
            return null;
        }
    } catch (error) {
        console.error('Error during the API request:', error);
        return null;
    }
};

export const JobOffererChangingInfoApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/InfoChange/jobOffererInfoChange', data);
        if (response.data) {
            return{
                joId: response.data.joId,
                joName: response.data.joName,
                companyName: response.data.companyName,
            };
        }
        else {
            console.error('No data in the server response.');
            return null;
        }
    } catch (error) {
        console.error('Error during the API request:', error);
        return null;
    }
};

export const DeleteJobSeekerApi = async (userId: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/InfoChange/jobSeekerDelete', { 
          jsId: userId,
          jsPw: password
         });
      
        // Check for any errors in the response.
        if(response.data.result === 'failed') throw new Error(response.data.message);
      
        return true;
      } catch(error) {
       console.error(error);
       return false;
      }
    };

export const DeleteJobOffererApi = async (userId: string) => {
    try{
        const response = await axios.post('http://localhost:4000/api/InfoChange/jobOffererDelete', { joId: userId });
        if(response.data){
            return response.data;
        }
        return null;
    } catch(error) {
        console.error(error);
        return null;
    }
}

export const JobSeekPostingsByJobClassApi = async (jobClass: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/jobSeekPostingListWithJsJobClass', { jsJobClass: jobClass });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any, index:number) => ({
                id:item.jobSeekPostingId || index.toString(),
                offerWage:item.offerWage,
                jsJobClass: item.jobSeeker.jsJobClass,
                jsAge: item.jobSeeker.jsAge,
                jsCareer: item.jobSeeker.jsCareer,
                jsName: item.jobSeeker.jsName,
                jsId: item.jobSeeker.jsId,

                workAttitude: item.jobSeeker.workAttitude,
                jobPerformance: item.jobSeeker.jobPerformance,
                rehiredRate: item.jobSeeker.rehiredRate,
                attendanceRate: item.jobSeeker.attendanceRate
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const JobSeekPostingsByCareerApi = async (career: number) => {
    try {
        const response = await axios.post('http://localhost:4000/api/jobSeekPostingListWithJsCareer', { jsCareer: career });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any, index:number) => ({
               id:item.jobSeekPostingId || index.toString(),
               offerWage:item.offerWage,
               jsJobClass:item.jobSeeker.Jobclass,
               jsAge: item.jobSeeker.jsAge,
               jsCareer: item.jobSeeker.jsCareer,
               jsName: item.jobSeeker.jsName,
               jsId: item.jobSeeker.jsId,

               workAttitude: item.jobSeeker.workAttitude,
               jobPerformance: item.jobSeeker.jobPerformance,
               rehiredRate: item.jobSeeker.rehiredRate,
               attendanceRate: item.jobSeeker.attendanceRate
           }));
           return formattedData;
       } else{
        console.error(response?.data.message);
        return null;
       }
   } catch(error){
       console.error(error);
       return null;
   }
}

export const JobOfferPostingsByJobClassApi = async (jobClass: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/jobOfferPostingListWithRequirementJobClass', { requirementJobClass: jobClass });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const JobOfferPostingsByCareerApi = async (career: number) => {
    try {
        const response = await axios.post('http://localhost:4000/api/jobOfferPostingListWithRequiredCareer', { requiredCareer: career });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const JobOfferPostingsByLocationApi = async (location: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/jobOfferPostingListWithLocation', { location });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                id:item.jobOfferPostingId.toString(),
                requirementJobClass:item.requirementJobClass,
                requirementEmployeeNum:item.requirementEmployeeNum,
                offerWage:item.offerWage,
                requiredCareer:item.requiredCareer,
                location:item.constructionSite.location,
                companyName:item.constructionSite.jobOfferer.companyName
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

export const interestedJobOfferPostingApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/inputInterestedJobOfferPosting', data);
        return response.data;
    } catch(error){
        console.error(error);
        return null;
    }
};

export const interestedJobSeekPostingApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/inputInterestedJobSeekPosting', data);
        return response.data;
    } catch(error){
        console.error(error);
        return null;
    }
};

export const InterestedJobSeekPostingsListApi = async (joId: string) => {
    try {
      const response = await axios.post('http://localhost:4000/api/interestedjobSeekPostingList', { joId });
      return response.data;
    } catch(error){
      console.error(error);
      return null;
    }
  };

  export const InterestedJobOfferPostingsListApi = async (jsId: string) => {
    try {
      const response = await axios.post('http://localhost:4000/api/interestedjobOfferPostingList', { jsId });
      return response.data;
    } catch(error){
      console.error(error);
      return null;
    }
  };

  export const inputMessage = async (messageData: { senderId: string; receiverId: string; messageTitle?: string; messageContents: string; }) => {
    try {
        const response = await axios.post('http://localhost:4000/api/inputMessage', messageData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch(error) {
        console.error(error);
        throw error;
    }
};


export const getMessageRecord = async (senderId: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/messageRecord', { senderId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                messageId:item.messageId,
                messageTitle:item.messageTitle,
                messageContents:item.messageContents,
                senderId:item.senderId,
                receiverId:item.receiverId
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error) {
        console.error(error);
        throw error;
    }
};

export const getMessageList = async (receiverId: string) => {
    try {
        const response = await axios.post('http://localhost:4000/api/messageList', { receiverId }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.result === true) {
            const formattedData = response.data.data.map((item:any) => ({
                messageId:item.messageId,
                messageTitle:item.messageTitle,
                messageContents:item.messageContents,
                senderId:item.senderId,
                receiverId:item.receiverId
            }));
            return formattedData;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error) {
        console.error(error);
        throw error;
    }
};

export const InputJobOfferPostingApi = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:4000/api/inputJobOfferPosting', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export const InputJobSeekPostingApi = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:4000/api/inputJobSeekPosting', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  export const bookJobOfferPostingApi = async (data: any) => {
    try {
        const response = await axios.post('http://localhost:4000/api/bookJobOfferPosting', data);
        if (response.data.result === true) {
            return response.data;
        } else {
            console.error(response.data.message);
            return null;
        }
    } catch(error){
        console.error(error);
        return null;
    }
};

//apis dir => 백엔드와 연결할 AXIOS 함수들을 저장함.