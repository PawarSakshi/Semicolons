// TextRazorService.js

import axios from 'axios';

const TEXT_RAZOR_API_KEY = '6a8427695ba2a95c6f2e8be4d317773c44085921fd1744bde630dc21';

export const extractKeywords = async (text) => {
    try {
        const response = await axios.post('https://api.textrazor.com/', {
            text: text,
            extractors: 'entities'
        }, {
            headers: {
                'x-textrazor-key': TEXT_RAZOR_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        return response.data.response.entities.map(entity => entity.entityId);
    } catch (error) {
        console.error('Error extracting keywords:', error);
        return [];
    }
};
