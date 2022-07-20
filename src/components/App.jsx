import React, { useState, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

const App = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [response, setResponse] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState([]);

  useEffect(() => {
    if (!search) {
      return;
    } else if (page > 0){
      setStatus('pending');

      const key = '26995225-4fa3fe4f15fe1635ebf8d0ee7';

      fetch(`https://pixabay.com/api/?key=${key}&q=${search}&page=${page}
    &image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(new Error('Not valid search'));
        }
        return response.json();
      })
      .then(pictures => {
        if (pictures.total === 0) {
          toast.warning('Not valid search');
          return this.setState({ status: 'rejected' });
        }

        const newArr = pictures.hits.map(elem => {
          return { id: elem.id, small: elem.webformatURL, big: elem.largeImageURL };
        });

        setResponse(prevState => [...prevState, ...newArr]);
        setStatus('resolved');

        if (pictures.hits.length < 12) {
          toast.warning('There are no more results');
          setStatus('rejected');
        }
      })
      .catch(error => {
        console.log(error);
        setStatus('rejected');
      });
  }
}, [search, page]);

  const searchImage = text => {
      if (search === text) {
        return;
       }
       setSearch(text);
       setPage(1);
       setResponse([])
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleModal = id => {
    const imageId = response.find(elem => elem.id === id);
    setModalValue(imageId);
    modalOpen();
  };

  const modalOpen = () => {
    setShowModal(true);
  };

  const modalClose = () => {
    setShowModal(false);
  };

    return (
      <div>
        {showModal && <Modal value={modalValue} onClose={modalClose} />}
        <Searchbar submit={searchImage} />

        <ImageGallery response={response} modal={handleModal} />

        {status === 'pending' && <Loader />}

        {status === 'resolved' && <Button handleLoadMore={loadMore} />}
        <ToastContainer autoClose={1000} />
      </div>
    );
  }

export default App;
