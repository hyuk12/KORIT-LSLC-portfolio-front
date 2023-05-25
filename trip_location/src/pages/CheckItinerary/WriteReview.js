/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react";

const { kakao } = window;

  const viewContainer = css`
    display: flex;
    margin-top: 64px;
    width: 100%;
    height: 800px;
  `;

  const mapContainer = css`
    flex-direction: column;
    border: 1px solid black;
    margin-left: 150px;
    margin-right: 20px;
    width: 500px;
  `;
  
  const mapMove = css`

  `;

  const map = css`
    margin: auto;
    width: 300px;
    height: 300px;
    border: 1px solid black;
  `;

  const locationList = css`
    margin: auto;
    width: 300px;
    height: 500px;
    border: 1px solid black;
    text-align: center;
  `;

  const reviewMove = css`
  
  `;

  const reviewContainer = css`
    border: 1px solid black;
    width: 1100px
  `;

  const titleAndSaveContainer = css`
    width: 100%;
    border: 1px solid black;
    padding: 10px;
  `;

  const reviewTitle = css`
    width: 500px;
    height: 80px;
  `;

  const saveButton = css`
    position: relative;
    top: 30px;
    left: 450px;
  `;

  const photoContainer = css`
    display: flex;
    padding: 10px;
    width: 100%;
    height: 150px;
    border: 1px solid black;
  `;

  const photoButton = css`
    width: 50px;
    height: 70px;
  `;

  const photo = css`
    display: flex;
    margin: 5px;
    justify-content: center;
    border: 1px solid black;
    width: 300px;
    height: 100% ;
  `;

  const writeReviewContainer = css`
    padding: 10px;
  `;

  

const WriteReview = () => {

    return (
      <div css={viewContainer}>
        <div css={mapContainer}>
          <div css={mapMove}>
            <div css={map}>지도</div>
          </div>
          <div css={reviewMove}>
            <div css={locationList}>장소표시</div>
          </div>
        </div>
        <div css={reviewContainer}>
          <div css={titleAndSaveContainer}>
            <input css={reviewTitle} type="text" />
            <button css={saveButton}>리뷰 저장하기</button>
          </div>
            <div css={photoContainer}>
            <button css={photoButton}>사진 추가하기</button>
            <div css={photo}>사진</div>
            <div css={photo}>사진</div>
            <div css={photo}>사진</div>
            </div>
          <div>
            <textarea css={writeReviewContainer} name="" id="" cols="154" rows="32"></textarea>
  `       </div>
        </div>
      </div>
    );
};

export default WriteReview;

