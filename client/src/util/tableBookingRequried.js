import swal from 'sweetalert';
import { myBookedTable } from './bookedTable';

export async function tableBookingRequired() {
  if (!myBookedTable) {
    await swal({
      title: 'Table Booking Required',
      text: 'Please Book the Table',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    window.location.href = '/tables';
  }
}
