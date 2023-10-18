import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  var [name, setName] = useState('');
  var [add, setAdd] = useState('');
  var [date, setDate] = useState('');
  var [desc, setDesc] = useState('');
  var [data, setData] = useState([]);

  var [selectedId, setSelectedId] = useState(null);
  var [isUpdate, setIsUpdate] = useState(false);


  var getData = () => {
    axios.get('http://127.0.0.1:8000/api/companies/').then((res) => {
      setData(res.data);
    })
  }
  useEffect(() => {
    getData();
  }, [])


  var Submit_Data = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('founded_date', date);
    formData.append('headquarters_location', add);
    formData.append('description', desc);

    if (isUpdate && selectedId) {
      axios.put(`http://127.0.0.1:8000/api/companies/${selectedId}/`, formData).then((res) => {
        getData();
        reset_Data();
        setIsUpdate(false);
        setSelectedId(null);
      });
    } else {
      axios.post('http://127.0.0.1:8000/api/companies/', formData).then((res) => {
        getData();
        reset_Data();
      })
    }
  }
    var reset_Data = () => {
      setName('');
      setAdd('');
      setDate('');
      setDesc('');
    }
    var delete_Data = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/companies/${id}/`).then((res) => {
        getData();
      })
    }
    var update_Data = (id) => {
      setSelectedId(id);
      setIsUpdate(true);
      // Fetch the data for the selected ID here and set the state variables to populate the form fields.
      // For example:
      const selectedCompany = data.find((item) => item.id === id);
      setName(selectedCompany.name);
      setDate(selectedCompany.founded_date);
      setAdd(selectedCompany.headquarters_location);
      setDesc(selectedCompany.description);
  }
  return (
    <>
      <div className='container-fluid'>
        {/* header start */}
        <div className='container'>
          <nav>
            <div className='row'>
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <h4 className='h4 text-primary'>CRUD</h4>
              </div>
              {/* <!-- Button trigger modal --> */}
              <div className='col-sm-12 col-md-6 col-lg-6'>
                <button type="button" id='nav-btn' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Add User
                </button>

                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        {/* form start */}
                        <form className='form'>
                          <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                              <label className='form-label' htmlFor='name'>Company Name</label>
                              <input type='text' className='form-control' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                              <label className='form-label' htmlFor='date'>Date</label>
                              <input type='date' className='form-control' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                              <label className='form-label' htmlFor='location'>Location</label>
                              <input type='text' className='form-control' name='location' value={add} onChange={(e) => setAdd(e.target.value)} />
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-sm-12 col-md-12 col-lg-12'>
                              <label className='form-label' htmlFor='description'>Description</label>
                              <textarea class="form-control" placeholder="Leave a comment here" value={desc} id="floatingTextarea" onChange={(e) => setDesc(e.target.value)} ></textarea>
                            </div>
                          </div>
                        </form>
                        {/* form end */}
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={Submit_Data}>Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        {/* header end */}
        <div className='container' id='show-data'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Company Name</th>
                <th>Founded date</th>
                <th>Headquarter Location</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item.name}</td>
                    <td>{item.founded_date}</td>
                    <td>{item.headquarters_location}</td>
                    <td>{item.description}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => delete_Data(item.id)}>Delete</button>
                      <button className='btn btn-success' style={{ marginLeft: '10px' }} onClick={() => { update_Data(item.id) }}>Update</button>
                    </td>
                  </tr>
                )

              })
              }
            </tbody>
          </table>
        </div>
      </div >
    </>
  );
}

export default App;
